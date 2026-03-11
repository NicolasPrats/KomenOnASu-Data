#!/usr/bin/env python3
"""
build.py — Compile Markdown sources -> dist/ JS data files + SVG figures.

Usage:
    python build.py [--strict] [--data DATA_DIR] [--dist DIST_DIR]

Options:
    --strict        Treat broken references as errors (default: warnings).
                    Use this flag in CI/CD pipelines.
    --data DIR      Source data directory (default: ./data)
    --dist DIR      Output directory (default: ./dist)

Requirements:
    pip install pyyaml          (only external dependency)
    System: tectonic, dvisvgm, svgo  (for TikZ compilation)
"""

import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import yaml


# ── SVG icons per element type (inlined, no external dep) ─────────────────────
ELEMENT_ICONS = {
    "hypothesis":  '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="11" r="6"/><line x1="14" y1="17" x2="14" y2="22"/><line x1="11" y1="22" x2="17" y2="22"/><line x1="12" y1="8" x2="16" y2="14"/></svg>',
    "observation": '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><ellipse cx="14" cy="14" rx="10" ry="5.5"/><circle cx="14" cy="14" r="3" fill="currentColor" stroke="none"/></svg>',
    "obs_failed":  '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><ellipse cx="14" cy="14" rx="10" ry="5.5"/><circle cx="14" cy="14" r="3" fill="currentColor" stroke="none"/><line x1="7" y1="7" x2="21" y2="21" stroke-width="2"/></svg>',
    "deduction":   '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="8" x2="22" y2="8"/><line x1="6" y1="13" x2="18" y2="13"/><polyline points="12,17 17,22 22,17"/></svg>',
    "experiment":  '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6v8l-4 8h16l-4-8V6"/><line x1="9" y1="6" x2="19" y2="6"/><circle cx="16" cy="18" r="1.5" fill="currentColor" stroke="none"/></svg>',
    "measure":     '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="20" height="6" rx="1"/><line x1="8" y1="11" x2="8" y2="8"/><line x1="12" y1="11" x2="12" y2="9"/><line x1="16" y1="11" x2="16" y2="9"/><line x1="20" y1="11" x2="20" y2="8"/></svg>',
    "instrument":  '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="14" r="8"/><line x1="14" y1="6" x2="14" y2="4"/><line x1="14" y1="24" x2="14" y2="22"/><line x1="6" y1="14" x2="4" y2="14"/><line x1="24" y1="14" x2="22" y2="14"/><line x1="14" y1="14" x2="19" y2="10"/></svg>',
}


# ── Logging ────────────────────────────────────────────────────────────────────

class BuildError(Exception):
    pass

_errors   = []
_warnings = []

def report(level, message, strict):
    if level == "error" or strict:
        _errors.append(message)
        print(f"  ERROR: {message}", file=sys.stderr)
    else:
        _warnings.append(message)
        print(f"  WARN:  {message}")


# ── Frontmatter parser (no external dep) ──────────────────────────────────────

def parse_md(path):
    """Parse a Markdown file with YAML frontmatter.
    Returns (metadata_dict, body_str).
    """
    text = Path(path).read_text(encoding="utf-8")
    if not text.startswith("---"):
        return {}, text
    # Find closing ---
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    yaml_block = text[3:end].strip()
    body = text[end + 4:].lstrip("\n")
    meta = yaml.safe_load(yaml_block) or {}
    return meta, body


# ── YAML loaders ───────────────────────────────────────────────────────────────

def load_yaml(path):
    with open(path, encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


# ── TikZ compilation ──────────────────────────────────────────────────────────

def _has_tool(name):
    return shutil.which(name) is not None

def compile_tikz(tikz_path, out_dir, strict):
    """Compile a .tikz file to SVG via tectonic + dvisvgm.
    Returns output SVG Path or None on failure/tools missing.
    Missing tools: warning in dev mode, error in --strict mode.
    """
    for tool, install in [("tectonic", "https://tectonic-typesetting.github.io"),
                           ("dvisvgm",  "apt install texlive-binaries")]:
        if not _has_tool(tool):
            msg = f"{tool} not found — TikZ figures skipped (install: {install})"
            if strict:
                report("error", msg, strict)
            else:
                report("warn", msg, strict)
            return None

    out_dir.mkdir(parents=True, exist_ok=True)
    stem     = tikz_path.stem
    svg_path = out_dir / f"{stem}.svg"

    tmp_dir = Path(tempfile.mkdtemp(dir=Path.home()))
    try:
        tex_file = tmp_dir / f"{stem}.tex"
        shutil.copy(tikz_path, tex_file)

        # tectonic 0.15: run from the directory containing the .tex file,
        # pass only the filename (not the path) — output goes to same dir
        r = subprocess.run(
            ["tectonic", tex_file.name, "--outfmt", "pdf"],
            capture_output=True, text=True, cwd=str(tmp_dir),
        )
        if r.returncode != 0:
            report("error", f"tectonic failed for {tikz_path.name}:\n{r.stderr}", strict)
            return None

        pdf_file = tmp_dir / f"{stem}.pdf"
        if not pdf_file.exists():
            report("error", f"tectonic produced no PDF for {tikz_path.name}", strict)
            return None

        r = subprocess.run(
            ["dvisvgm", "--pdf", str(pdf_file.name)],
            capture_output=True, text=True, cwd=str(tmp_dir),
        )
        if r.returncode != 0:
            report("error", f"dvisvgm failed for {tikz_path.name}:\n{r.stderr}", strict)
            return None

        generated_svg = tmp_dir / f"{stem}.svg"
        if not generated_svg.exists():
            report("error", f"dvisvgm produced no SVG for {tikz_path.name}", strict)
            return None
        out_dir.mkdir(parents=True, exist_ok=True)
        shutil.move(str(generated_svg), str(svg_path))
    finally:
        shutil.rmtree(tmp_dir, ignore_errors=True)

    if _has_tool("svgo"):
        subprocess.run(["svgo", "--quiet", str(svg_path)], capture_output=True)

    print(f"    compiled {tikz_path.name} -> {svg_path.name}")
    return svg_path


# ── Description processing ────────────────────────────────────────────────────

def process_description(body, node_dir, dist_figures_dir, node_id, strict):
    """Replace local figure references: .tikz -> compiled SVG, other images copied."""
    def replace_figure(match):
        alt = match.group(1)
        src = match.group(2)

        if src.startswith("http://") or src.startswith("https://"):
            return match.group(0)

        src_path = node_dir / src
        if not src_path.exists():
            report("error", f"Node '{node_id}': figure '{src}' not found", strict)
            return match.group(0)

        if src_path.suffix == ".tikz":
            svg = compile_tikz(src_path, dist_figures_dir, strict)
            return f"![{alt}](figures/{node_id}/{svg.name})" if svg else match.group(0)

        dest = dist_figures_dir / src_path.name
        dist_figures_dir.mkdir(parents=True, exist_ok=True)
        shutil.copy(src_path, dest)
        return f"![{alt}](figures/{node_id}/{src_path.name})"

    return re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', replace_figure, body)


# ── Loaders ───────────────────────────────────────────────────────────────────

def load_nodes(data_dir, valid_topics, valid_elements, strict):
    nodes = {}
    nodes_dir = data_dir / "nodes"
    if not nodes_dir.exists():
        raise BuildError(f"nodes/ not found in {data_dir}")

    for node_dir in sorted(nodes_dir.iterdir()):
        if not node_dir.is_dir():
            continue
        node_id    = node_dir.name
        index_file = node_dir / "index.md"

        if not index_file.exists():
            report("error", f"Node '{node_id}': no index.md", strict)
            continue

        meta, body = parse_md(index_file)

        missing = [f for f in ("name", "year", "element", "status", "topic") if f not in meta]
        if missing:
            report("error", f"Node '{node_id}': missing fields {missing}", strict)
            continue

        if meta["element"] not in valid_elements:
            report("error", f"Node '{node_id}': unknown element '{meta['element']}'", strict)
        if meta["topic"] not in valid_topics:
            report("error", f"Node '{node_id}': unknown topic '{meta['topic']}'", strict)

        nodes[node_id] = {
            "_dir":          node_dir,
            "_body":         body,
            "id":            node_id,
            "name":          meta.get("name", ""),
            "year":          int(meta["year"]),
            "element":       meta.get("element", ""),
            "status":        meta.get("status", "open"),
            "topic":         meta.get("topic", ""),
            "author":        meta.get("author", ""),
            "excerpt":       meta.get("excerpt", ""),
            "contributors":  list(meta.get("contributors") or []),
            "relatesTo":     list(meta.get("relatesTo") or []),
            "humanReviewed": bool(meta.get("humanReviewed", False)),
            "refs":          list(meta.get("refs") or []),
        }

    return nodes


def load_scientists(data_dir, strict):
    scientists = {}
    sci_dir = data_dir / "scientists"
    if not sci_dir.exists():
        raise BuildError(f"scientists/ not found in {data_dir}")

    for sci_path in sorted(sci_dir.iterdir()):
        if not sci_path.is_dir():
            continue
        sci_id     = sci_path.name
        index_file = sci_path / "index.md"

        if not index_file.exists():
            report("error", f"Scientist '{sci_id}': no index.md", strict)
            continue

        meta, body = parse_md(index_file)

        missing = [f for f in ("name", "born") if f not in meta]
        if missing:
            report("error", f"Scientist '{sci_id}': missing fields {missing}", strict)
            continue

        scientists[sci_id] = {
            "_body":         body.strip(),
            "name":          meta.get("name", ""),
            "born":          int(meta["born"]),
            "died":          int(meta["died"]) if "died" in meta else None,
            "tagline":       meta.get("tagline", ""),
            "humanReviewed": bool(meta.get("humanReviewed", False)),
            "contributions": [],   # filled by cross-reference pass
        }

    return scientists


# ── Cross-reference validation ─────────────────────────────────────────────────

def build_cross_references(nodes, scientists, strict):
    node_ids = set(nodes)
    sci_ids  = set(scientists)

    for sci in scientists.values():
        sci["contributions"] = []

    for node_id, node in nodes.items():
        for ref in node["relatesTo"]:
            if ref not in node_ids:
                report("error", f"Node '{node_id}': relatesTo unknown node '{ref}'", strict)

        for contributor in node["contributors"]:
            if contributor not in sci_ids:
                report("error", f"Node '{node_id}': contributor '{contributor}' unknown", strict)
            else:
                scientists[contributor]["contributions"].append({"nodeId": node_id})


# ── Finalisation ──────────────────────────────────────────────────────────────

def finalise_nodes(nodes, dist_dir, strict):
    for node_id, node in nodes.items():
        dist_figures = dist_dir / "figures" / node_id
        node["description"] = process_description(
            node.pop("_body"), node.pop("_dir"), dist_figures, node_id, strict
        )
        if not node["excerpt"]:
            first = next(
                (l.strip() for l in node["description"].splitlines()
                 if l.strip() and not l.startswith("!") and not l.startswith("#")),
                ""
            )
            node["excerpt"] = first[:120]

def finalise_scientists(scientists):
    for sci in scientists.values():
        sci["bio"] = sci.pop("_body")


# ── JS writers ────────────────────────────────────────────────────────────────

def _js_str(s):
    """Escape for JS template literal."""
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

def _refs_js(refs):
    parts = []
    for r in refs:
        if "url" in r:
            parts.append(f"          {{ label:{json.dumps(r['label'], ensure_ascii=False)}, url:{json.dumps(r['url'], ensure_ascii=False)} }}")
        else:
            parts.append(f"          {{ label:{json.dumps(r['label'], ensure_ascii=False)} }}")
    inner = ",\n".join(parts)
    return f"[\n{inner}\n        ]"

def write_elements_js(elements, out_dir):
    lines = ["const ELEMENTS = {"]
    for eid, e in elements.items():
        lines.append(
            f"  {eid}:  {{ label:{json.dumps(e['label'], ensure_ascii=False)}, color:{json.dumps(e['color'], ensure_ascii=False)}, "
            f"humanReviewed:{str(e.get('humanReviewed', False)).lower()} }},"
        )
    lines += ["};\n", "const ELEMENT_ICONS = {"]
    for eid, svg in ELEMENT_ICONS.items():
        lines.append(f"  {eid}: `{svg.replace('`', chr(92) + '`')}`,")
    lines += ["};\n", "export { ELEMENTS, ELEMENT_ICONS };"]
    (out_dir / "elements.js").write_text("\n".join(lines), encoding="utf-8")

def write_scientists_js(scientists, out_dir):
    lines = ["// Colors are assigned at runtime by store.js", "const SCIENTISTS = {"]
    for sid, s in scientists.items():
        contribs = ", ".join(f"{{ nodeId: {json.dumps(c['nodeId'], ensure_ascii=False)} }}" for c in s["contributions"])
        died_val = str(s["died"]) if s["died"] is not None else "null"
        lines += [
            f"  {sid}: {{",
            f"    name: {json.dumps(s['name'], ensure_ascii=False)},",
            f"    born: {s['born']}, died: {died_val},",
            f"    tagline: {json.dumps(s['tagline'], ensure_ascii=False)},",
            f"    bio: `{_js_str(s['bio'])}`,",
            f"    humanReviewed: {str(s['humanReviewed']).lower()},",
            f"    contributions: [{contribs}],",
            f"  }},",
        ]
    lines += ["};\n", "export { SCIENTISTS };"]
    (out_dir / "scientists.js").write_text("\n".join(lines), encoding="utf-8")

def write_topics_js(domains, topics, nodes, out_dir):
    nodes_by_topic = {tid: [] for tid in topics}
    for node in nodes.values():
        tid = node["topic"]
        if tid in nodes_by_topic:
            nodes_by_topic[tid].append(node)
    for lst in nodes_by_topic.values():
        lst.sort(key=lambda n: n["year"])

    lines = ["const DOMAINS = {"]
    for did, d in domains.items():
        topic_ids = [tid for tid, t in topics.items() if did in (t.get("domains") or [])]
        ids_str = ", ".join(f"'{tid}'" for tid in topic_ids)
        lines.append(f"  {did}: {{ label:{json.dumps(d['label'], ensure_ascii=False)}, topics:[{ids_str}] }},")
    lines += ["};\n", "const TOPICS = {"]

    for tid, topic in topics.items():
        lines += [f"  {tid}: {{", f"    label: {json.dumps(topic['label'], ensure_ascii=False)},", "    nodes: ["]
        for node in nodes_by_topic.get(tid, []):
            relates = ", ".join(f"'{r}'" for r in node["relatesTo"])
            lines += [
                f"      {{ id:{json.dumps(node['id'], ensure_ascii=False)}, year:{node['year']}, element:{json.dumps(node['element'], ensure_ascii=False)},",
                f"        name:{json.dumps(node['name'], ensure_ascii=False)}, author:{json.dumps(node['author'], ensure_ascii=False)},",
                f"        excerpt:{json.dumps(node['excerpt'], ensure_ascii=False)},",
                f"        description:`{_js_str(node['description'])}`,",
                f"        status:{json.dumps(node['status'], ensure_ascii=False)}, relatesTo:[{relates}],",
                f"        refs:{_refs_js(node['refs'])},",
                f"        humanReviewed:{str(node['humanReviewed']).lower()} }},",
            ]
        lines += ["    ],", "  },"]
    lines += ["};\n", "export { DOMAINS, TOPICS };"]
    (out_dir / "topics.js").write_text("\n".join(lines), encoding="utf-8")


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--strict", action="store_true",
                        help="Broken references -> errors (for CI/CD)")
    parser.add_argument("--data", default="data", metavar="DIR")
    parser.add_argument("--dist", default="dist", metavar="DIR")
    args = parser.parse_args()

    data_dir = Path(args.data).resolve()
    dist_dir = Path(args.dist).resolve()
    strict   = args.strict

    print(f"Build starting")
    print(f"  data : {data_dir}")
    print(f"  dist : {dist_dir}")
    print(f"  mode : {'strict (CI)' if strict else 'lenient (dev)'}")

    if not data_dir.exists():
        raise BuildError(f"Data directory not found: {data_dir}")

    dist_data = dist_dir / "data"
    dist_data.mkdir(parents=True, exist_ok=True)

    print("\n* Loading config...")
    domains  = load_yaml(data_dir / "domains.yaml")
    topics   = load_yaml(data_dir / "topics.yaml")
    elements = load_yaml(data_dir / "elements.yaml")
    print(f"  {len(domains)} domains, {len(topics)} topics, {len(elements)} elements")

    print("\n* Loading nodes...")
    nodes = load_nodes(data_dir, set(topics), set(elements), strict)
    print(f"  {len(nodes)} nodes")

    print("\n* Loading scientists...")
    scientists = load_scientists(data_dir, strict)
    print(f"  {len(scientists)} scientists")

    print("\n* Validating cross-references...")
    build_cross_references(nodes, scientists, strict)

    print("\n* Processing descriptions & figures...")
    finalise_nodes(nodes, dist_dir, strict)
    finalise_scientists(scientists)

    if _errors:
        print(f"\nBuild FAILED — {len(_errors)} error(s):", file=sys.stderr)
        for e in _errors:
            print(f"  - {e}", file=sys.stderr)
        sys.exit(1)

    print("\n* Writing JS files...")
    write_elements_js(elements, dist_data)
    print("  data/elements.js")
    write_scientists_js(scientists, dist_data)
    print("  data/scientists.js")
    write_topics_js(domains, topics, nodes, dist_data)
    print("  data/topics.js")

    warn_str = f", {len(_warnings)} warning(s)" if _warnings else ""
    print(f"\nBuild complete -- {len(nodes)} nodes, {len(scientists)} scientists{warn_str}")


if __name__ == "__main__":
    try:
        main()
    except BuildError as e:
        print(f"\nBuildError: {e}", file=sys.stderr)
        sys.exit(1)
