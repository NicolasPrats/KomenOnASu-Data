// Colors are assigned at runtime by store.js
const SCIENTISTS = {
  aristarque: {
    name: "Aristarque de Samos",
    born: -310, died: -230,
    tagline: "Premier héliocentrisme : proposa que la Terre tourne autour du Soleil, 18 siècles avant Copernic.",
    bio: `Aristarque de Samos (~310–230 av. J.-C.) est l'un des astronomes les plus audacieux de l'Antiquité. Sa méthode pour mesurer le rapport des distances Terre–Lune et Terre–Soleil est géométriquement rigoureuse, même si sa mesure de l'angle (~87° au lieu de 89°50′) l'amène à sous-estimer la distance au Soleil.`,
    humanReviewed: false,
    contributions: [{ nodeId: "ded_dist_sol_aristarque" }, { nodeId: "exp_demi_lune" }],
  },
  aristote: {
    name: "Aristote",
    born: -384, died: -322,
    tagline: "Encyclopédiste antique : premier à démontrer par l'observation la sphéricité de la Terre.",
    bio: `Aristote (~384–322 av. J.-C.) est l'un des penseurs les plus influents de l'Antiquité. Dans *Du Ciel* (Περὶ οὐρανοῦ), il rassemble plusieurs arguments empiriques pour conclure à la sphéricité de la Terre : l'ombre circulaire lors des éclipses de Lune, la variation des constellations selon la latitude, et l'argument gravitationnel. C'est la première démonstration multi-preuves convergentes d'un fait cosmologique.`,
    humanReviewed: false,
    contributions: [{ nodeId: "ded_sphere" }, { nodeId: "obs_eclipses" }, { nodeId: "obs_etoiles" }],
  },
  cassini: {
    name: "Giovanni Cassini",
    born: 1625, died: 1712,
    tagline: "Astronome italo-français, directeur de l'Observatoire de Paris ; mesura la première Unité Astronomique fiable.",
    bio: `Giovanni Domenico Cassini (1625–1712) est nommé premier directeur de l'Observatoire de Paris en 1671. En 1672, il organise avec Jean Richer l'observation de l'opposition de Mars pour calculer sa parallaxe — première valeur fiable de l'Unité Astronomique (~140 millions de km).`,
    humanReviewed: false,
    contributions: [{ nodeId: "measure_parallax_mars" }],
  },
  eratosthene: {
    name: "Ératosthène de Cyrène",
    born: -276, died: -195,
    tagline: "Directeur de la Bibliothèque d'Alexandrie ; premier à mesurer la circonférence de la Terre.",
    bio: `Ératosthène (~276–195 av. J.-C.) est l'un des savants les plus remarquables de l'Antiquité. Directeur de la Grande Bibliothèque d'Alexandrie, il excelle en géographie, astronomie et mathématiques. Son expérience du puits de Syène est un chef-d'œuvre de raisonnement géométrique appliqué.`,
    humanReviewed: false,
    contributions: [{ nodeId: "exp_puit" }, { nodeId: "instr_armillaire" }, { nodeId: "measure_era" }],
  },
  galilee: {
    name: "Galilée",
    born: 1564, died: 1642,
    tagline: "Père de la physique expérimentale ; premier à utiliser le télescope pour l'astronomie.",
    bio: `Galileo Galilei (1564–1642) est une figure centrale de la révolution scientifique. Il pointe son télescope vers le ciel en 1609 et fait des découvertes fondamentales : montagnes sur la Lune, satellites de Jupiter, phases de Vénus. Ces dernières prouvent que Vénus orbite autour du Soleil, invalidant le géocentrisme.`,
    humanReviewed: false,
    contributions: [{ nodeId: "instr_telescope" }],
  },
  hipparque: {
    name: "Hipparque de Nicée",
    born: -190, died: -120,
    tagline: "Astronome grec, fondateur de la trigonométrie et premier à mesurer la distance Terre–Lune.",
    bio: `Hipparque (~190–120 av. J.-C.) est considéré comme le plus grand astronome de l'Antiquité. Il invente ou développe la trigonométrie, dresse le premier catalogue d'étoiles important, et découvre la précession des équinoxes. Sa mesure de la distance Terre–Lune par la parallaxe reste précise à ~1 % près.`,
    humanReviewed: false,
    contributions: [{ nodeId: "instr_dioptre" }, { nodeId: "measure_parallax_moon" }],
  },
  pythagore: {
    name: "Pythagore de Samos",
    born: -570, died: -495,
    tagline: "Mathématicien et philosophe, fondateur d'une école qui voyait la sphère comme forme parfaite.",
    bio: `Pythagore (~570–495 av. J.-C.) fonde à Crotone une communauté philosophico-religieuse où les mathématiques occupent une place centrale. Son école soutient que la sphère est la forme géométrique la plus parfaite — ce qui les conduit à postuler une Terre sphérique bien avant toute preuve empirique. Si ce raisonnement est esthétique plutôt que scientifique, il s'avéra juste.`,
    humanReviewed: false,
    contributions: [{ nodeId: "hyp_sphere_pyth" }],
  },
  thales: {
    name: "Thalès de Milet",
    born: -624, died: -548,
    tagline: "Philosophe et mathématicien grec, premier à proposer des explications naturelles du cosmos.",
    bio: `Thalès de Milet (~624–548 av. J.-C.) est considéré comme l'un des premiers philosophes et scientifiques grecs. Il est célèbre pour avoir cherché une explication matérielle de l'univers (l'eau comme principe fondamental) plutôt que mythologique. En géométrie, il est crédité de plusieurs théorèmes. En astronomie, il aurait prédit une éclipse solaire en −585. Sa cosmologie plaçait la Terre comme un disque flottant sur l'eau.`,
    humanReviewed: false,
    contributions: [{ nodeId: "hyp_plat" }],
  },
};

export { SCIENTISTS };