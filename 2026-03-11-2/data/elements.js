const ELEMENTS = {
  hypothesis:  { label:"Hypothèse", color:"#9b6fd4", humanReviewed:false },
  observation:  { label:"Observation", color:"#009e73", humanReviewed:false },
  obs_failed:  { label:"Obs. ambiguë", color:"#cc79a7", humanReviewed:false },
  deduction:  { label:"Déduction", color:"#e69f00", humanReviewed:false },
  experiment:  { label:"Expérience", color:"#0072b2", humanReviewed:false },
  measure:  { label:"Mesure", color:"#f0e442", humanReviewed:false },
  instrument:  { label:"Instrument", color:"#d55e00", humanReviewed:false },
};

const ELEMENT_ICONS = {
  hypothesis: `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="11" r="6"/><line x1="14" y1="17" x2="14" y2="22"/><line x1="11" y1="22" x2="17" y2="22"/><line x1="12" y1="8" x2="16" y2="14"/></svg>`,
  observation: `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><ellipse cx="14" cy="14" rx="10" ry="5.5"/><circle cx="14" cy="14" r="3" fill="currentColor" stroke="none"/></svg>`,
  obs_failed: `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><ellipse cx="14" cy="14" rx="10" ry="5.5"/><circle cx="14" cy="14" r="3" fill="currentColor" stroke="none"/><line x1="7" y1="7" x2="21" y2="21" stroke-width="2"/></svg>`,
  deduction: `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="8" x2="22" y2="8"/><line x1="6" y1="13" x2="18" y2="13"/><polyline points="12,17 17,22 22,17"/></svg>`,
  experiment: `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6v8l-4 8h16l-4-8V6"/><line x1="9" y1="6" x2="19" y2="6"/><circle cx="16" cy="18" r="1.5" fill="currentColor" stroke="none"/></svg>`,
  measure: `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="20" height="6" rx="1"/><line x1="8" y1="11" x2="8" y2="8"/><line x1="12" y1="11" x2="12" y2="9"/><line x1="16" y1="11" x2="16" y2="9"/><line x1="20" y1="11" x2="20" y2="8"/></svg>`,
  instrument: `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="14" r="8"/><line x1="14" y1="6" x2="14" y2="4"/><line x1="14" y1="24" x2="14" y2="22"/><line x1="6" y1="14" x2="4" y2="14"/><line x1="24" y1="14" x2="22" y2="14"/><line x1="14" y1="14" x2="19" y2="10"/></svg>`,
};

export { ELEMENTS, ELEMENT_ICONS };