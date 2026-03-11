const DOMAINS = {
  astronomie: { label:"Astronomie", topics:['forme', 'taille', 'distance'] },
  geodesie: { label:"Géodésie", topics:['forme', 'taille'] },
};

const TOPICS = {
  forme: {
    label: "Forme de la Terre",
    nodes: [
      { id:"hyp_plat", year:-600, element:"hypothesis",
        name:"La Terre est plate", author:"Thalès, Anaximandre — vision commune",
        excerpt:"Disque plat flottant sur l'eau ou suspendu dans l'air",
        description:`La plupart des civilisations antiques conceptualisent la Terre comme un disque plat. Thalès (~624–548 av. J.-C.) envisage un disque flottant sur l'eau ; Anaximandre (~610–546 av. J.-C.) propose un cylindre suspendu dans l'espace. Ces modèles s'appuient sur l'expérience quotidienne visuelle et l'intuition que l'horizon représente le bord du monde.
`,
        status:"refuted", relatesTo:[],
        refs:[
          { label:"Anaximandre — Stanford Encyclopedia of Philosophy", url:"https://plato.stanford.edu/entries/anaximander/" },
          { label:"Couprie, D. L. (2011). Heaven and Earth in Ancient Greek Cosmology. Springer." }
        ],
        humanReviewed:false },
      { id:"hyp_sphere_pyth", year:-530, element:"hypothesis",
        name:"La Terre est sphérique", author:"Pythagore (~570–495 av. J.-C.)",
        excerpt:"La sphère est la forme parfaite — argument esthétique et géométrique",
        description:`Pythagore est généralement crédité de la première hypothèse d'une Terre sphérique, non par observation, mais par conviction philosophique et géométrique. La sphère est la forme la plus parfaite et noble qui soit. Il est donc naturel que la Terre, corps cosmique important, ait cette forme.
`,
        status:"confirmed", relatesTo:[],
        refs:[
          { label:"Pythagoras — Stanford Encyclopedia of Philosophy", url:"https://plato.stanford.edu/entries/pythagoras/" },
          { label:"Dreyer, J. L. E. (1953). A History of Astronomy from Thales to Kepler. Dover." }
        ],
        humanReviewed:false },
      { id:"obs_bateau", year:-350, element:"obs_failed",
        name:"Disparition progressive des bateaux à l'horizon", author:"Observation populaire, discutée par Platon",
        excerpt:"La coque disparaît avant les mâts — jugé non concluant à cause des vagues",
        description:`L'observation que les bateaux s'éloignant "s'enfoncent" progressivement dans l'horizon est souvent citée comme indice de courbure. Platon signale cependant que cet argument est ambigu : les vagues et les perturbations atmosphériques pourraient expliquer ce phénomène sur une Terre plate. Cette observation est donc réelle mais épistémiquement fragile sans instruments précis.
`,
        status:"partial", relatesTo:[],
        refs:[
          { label:"Platon — Phédon, 108e–109a", url:"https://classics.mit.edu/Plato/phaedo.html" }
        ],
        humanReviewed:false },
      { id:"obs_eclipses", year:-350, element:"observation",
        name:"Ombre circulaire lors des éclipses de Lune", author:"Aristote (~384–322 av. J.-C.)",
        excerpt:"L'ombre projetée sur la Lune est toujours un arc de cercle, quel que soit l'angle",
        description:`Aristote observe systématiquement les éclipses de Lune et note que l'ombre projetée par la Terre sur la Lune est **toujours un arc de cercle** — quelle que soit la position relative des astres.

Il raisonne : la seule forme qui projette toujours une ombre circulaire, quel que soit l'angle d'éclairage, est la **sphère**. Un disque, par exemple, projetterait parfois une ellipse.

C'est la première preuve empirique solide de la sphéricité terrestre, exposée dans *Du Ciel*.

![Buste d'Aristote, copie romaine d'après Lysippe](https://upload.wikimedia.org/wikipedia/commons/a/ae/Aristotle_Altemps_Inv8575.jpg)
*Buste d'Aristote — copie romaine d'après Lysippe, Museo Nazionale Romano. [Source : Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg), domaine public.*

![Schéma éclipse lunaire](figures/obs_eclipses/eclipse_lune.svg)
`,
        status:"confirmed", relatesTo:['hyp_sphere_pyth'],
        refs:[
          { label:"Aristote — Du Ciel (De Caelo), II, 14", url:"https://classics.mit.edu/Aristotle/heavens.2.ii.html" },
          { label:"Aristotle's Cosmology — Stanford Encyclopedia of Philosophy", url:"https://plato.stanford.edu/entries/aristotle-cosmology/" }
        ],
        humanReviewed:false },
      { id:"obs_etoiles", year:-350, element:"observation",
        name:"Étoiles différentes selon la latitude", author:"Aristote (~384–322 av. J.-C.)",
        excerpt:"Les constellations changent selon qu'on se déplace vers le nord ou le sud",
        description:`Aristote observe — et recueille des témoignages de voyageurs — que certaines étoiles visibles en Égypte ne sont pas visibles depuis la Grèce, et vice versa. De plus, l'étoile polaire s'élève plus haut dans le ciel quand on voyage vers le nord. Ce phénomène n'est cohérent qu'avec une surface courbée.
`,
        status:"confirmed", relatesTo:['hyp_sphere_pyth'],
        refs:[
          { label:"Aristote — Du Ciel, II, 14 (298a)", url:"https://classics.mit.edu/Aristotle/heavens.2.ii.html" }
        ],
        humanReviewed:false },
      { id:"ded_sphere", year:-340, element:"deduction",
        name:"La Terre est sphérique — synthèse", author:"Aristote",
        excerpt:"Seule la sphère est compatible avec toutes les observations disponibles",
        description:`Aristote effectue une synthèse dans *Du Ciel* (livre II) en cumulant trois preuves indépendantes :

- **L'ombre des éclipses** — toujours circulaire, quel que soit l'angle
- **Les étoiles variables selon la latitude** — incompatible avec un plan
- **L'argument gravitationnel** — tout corps pesant tend vers un centre commun, ce qui produit une sphère

C'est la première **démonstration multi-preuves convergentes** d'un fait scientifique fondamental.
`,
        status:"confirmed", relatesTo:['obs_eclipses', 'obs_etoiles', 'hyp_sphere_pyth'],
        refs:[
          { label:"Aristote — Du Ciel, II, 13–14", url:"https://classics.mit.edu/Aristotle/heavens.2.ii.html" },
          { label:"Lindberg, D. C. (2007). The Beginnings of Western Science. Univ. of Chicago Press." }
        ],
        humanReviewed:false },
    ],
  },
  taille: {
    label: "Taille de la Terre",
    nodes: [
      { id:"instr_gnomon", year:-500, element:"instrument",
        name:"Gnomon", author:"Usage répandu dans l'Antiquité",
        excerpt:"Tige verticale dont l'ombre mesure la hauteur angulaire du Soleil",
        description:`Le gnomon est l'un des plus anciens instruments astronomiques : une simple tige verticale plantée en terre. En mesurant la longueur de l'ombre au solstice d'été à midi, on peut calculer l'angle du Soleil par rapport au zénith. Sa simplicité ne diminue pas sa puissance.
`,
        status:"confirmed", relatesTo:[],
        refs:[
          { label:"Gnomon — Encyclopædia Britannica", url:"https://www.britannica.com/technology/gnomon" }
        ],
        humanReviewed:false },
      { id:"exp_puit", year:-240, element:"experiment",
        name:"Expérience du puits de Syène", author:"Ératosthène de Cyrène (~276–195 av. J.-C.)",
        excerpt:"À Syène, le Soleil éclaire le fond d'un puits vertical au solstice — preuve de la courbure",
        description:`Ératosthène apprend qu'à Syène (actuelle Assouan), le jour du solstice d'été, le soleil est exactement au zénith : il éclaire le fond d'un puits vertical sans laisser d'ombre. À Alexandrie, la même journée, un gnomon produit une ombre correspondant à **un angle d'environ 7,2°** (soit 1/50 de cercle).

Le raisonnement :
1. Si la Terre est sphérique, cet angle représente l'arc Alexandrie–Syène
2. Distance mesurée à 5 000 stades
3. Circonférence = 5 000 × 50 = **250 000 stades**

Erreur probable inférieure à 2 % — un chef-d'œuvre de géométrie appliquée.

![Schéma de l'expérience du puits de Syène](figures/exp_puit/puits_syene.svg)
`,
        status:"confirmed", relatesTo:['ded_sphere', 'instr_gnomon'],
        refs:[
          { label:"Cléomède — Sur les cieux, I, 7 (source primaire transmettant Ératosthène)", url:"https://archive.org/details/cleomedesoncircu0000cleo" },
          { label:"Nicastro, N. (2008). Circumference: Eratosthenes and the Ancient Quest to Measure the Globe. St. Martin's Press." },
          { label:"Ératosthène — Wikipedia", url:"https://fr.wikipedia.org/wiki/%C3%89ratosth%C3%A8ne" }
        ],
        humanReviewed:false },
      { id:"measure_era", year:-240, element:"measure",
        name:"Circonférence ≈ 250 000 stades (~39 375 km)", author:"Ératosthène",
        excerpt:"Distance Syène–Alexandrie × 50 = circonférence terrestre",
        description:`La distance Alexandrie–Syène est estimée à 5 000 stades. Ératosthène calcule : 5 000 × 50 = 250 000 stades. Selon la valeur du stade utilisée (entre 157,5 m et 185 m), cela donne entre 39 375 km et 46 250 km. La valeur réelle est 40 075 km — une précision probablement inférieure à 2 % d'erreur avec le stade alexandrin.
`,
        status:"confirmed", relatesTo:['exp_puit'],
        refs:[
          { label:"Stadion (unit) — Wikipedia", url:"https://en.wikipedia.org/wiki/Stadion_(unit)" },
          { label:"Rawlins, D. (1982). Eratosthenes' geodesy unraveled. Isis, 73(2)." }
        ],
        humanReviewed:false },
      { id:"instr_dioptre", year:-150, element:"instrument",
        name:"Dioptre", author:"Hipparque, puis Héron d'Alexandrie",
        excerpt:"Instrument de visée angulaire pour mesurer les positions célestes",
        description:`Le dioptre est un instrument de visée permettant de mesurer des angles entre objets célestes ou terrestres. Composé d'une règle graduée et de pinnules, il permet des mesures angulaires avec une précision de l'ordre du degré. Il préfigure le théodolite moderne.
`,
        status:"confirmed", relatesTo:[],
        refs:[
          { label:"Dioptra — Wikipedia", url:"https://en.wikipedia.org/wiki/Dioptra" },
          { label:"Héron d'Alexandrie — Dioptra (archive.org)", url:"https://archive.org/search?query=heron+dioptra" }
        ],
        humanReviewed:false },
      { id:"measure_parallax_moon", year:-130, element:"measure",
        name:"Parallaxe lunaire → distance Terre–Lune", author:"Hipparque (~190–120 av. J.-C.)",
        excerpt:"Première mesure fiable par triangulation : ~60 rayons terrestres",
        description:`Hipparque utilise la parallaxe pour estimer la distance de la Lune. En observant une éclipse solaire totale depuis deux points différents, il obtient une distance d'environ 59 à 67 rayons terrestres (valeur réelle : ~60,3). Cette mesure établit la méthode par parallaxe qui sera réutilisée pendant deux millénaires.

![Schéma de la parallaxe lunaire](figures/measure_parallax_moon/parallaxe_lune.svg)
`,
        status:"confirmed", relatesTo:['instr_dioptre', 'measure_era'],
        refs:[
          { label:"Toomer, G. J. (1974). Hipparchus on the distances of the sun and moon. Archive for History of Exact Sciences, 14(2)." },
          { label:"Hipparque — Wikipedia", url:"https://fr.wikipedia.org/wiki/Hipparque" }
        ],
        humanReviewed:false },
      { id:"measure_poseidonios", year:-100, element:"measure",
        name:"Révision à la baisse : ~180 000 stades", author:"Poséidonios (~135–51 av. J.-C.)",
        excerpt:"Méthode par l'étoile Canopus — sous-estimation notable reprise par Ptolémée",
        description:`Poséidonios mesure la hauteur de l'étoile Canopus à Rhodes et à Alexandrie. Il obtient environ 180 000 stades — soit ~29 000 km, nettement sous-estimé. Reprise par Ptolémée, cette valeur influencera la cartographie médiévale et encouragera Colomb à naviguer vers l'ouest.
`,
        status:"refuted", relatesTo:['measure_era', 'instr_dioptre'],
        refs:[
          { label:"Strabon — Géographique, II, 2, 2 (source de Poséidonios)", url:"https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/2B*.html" },
          { label:"Fischer, I. (1975). Another Look at Eratosthenes and Posidonius. Quarterly Journal of the Royal Astronomical Society, 16." }
        ],
        humanReviewed:false },
    ],
  },
  distance: {
    label: "Distance Terre–Soleil",
    nodes: [
      { id:"exp_demi_lune", year:-270, element:"experiment",
        name:"Méthode de la demi-Lune", author:"Aristarque de Samos (~310–230 av. J.-C.)",
        excerpt:"Quand la Lune est exactement à demi-éclairée, l'angle Lune–Terre–Soleil est mesurable",
        description:`Aristarque propose un raisonnement géométrique brillant : quand la Lune est au **quartier exact**, l'angle Soleil–Lune–Terre est de 90°. En mesurant l'angle α = Lune–Terre–Soleil, on obtient :

> distance Terre–Soleil / distance Terre–Lune = 1 / cos(α)

Aristarque mesure **α ≈ 87°** (valeur réelle : 89°50′). La méthode est rigoureusement correcte ; c'est la précision de la mesure à l'œil nu qui est en cause — une erreur de 3° induit une erreur d'un facteur ~20 sur le résultat.

![Schéma de la méthode de la demi-Lune](figures/exp_demi_lune/demi_lune.svg)
`,
        status:"partial", relatesTo:['instr_armillaire'],
        refs:[
          { label:"Aristarque — Sur les tailles et les distances (trad. Heath, 1913)", url:"https://archive.org/details/aristarchusofsam00arisuoft" },
          { label:"Aristarque de Samos — Wikipedia", url:"https://fr.wikipedia.org/wiki/Aristarque_de_Samos" }
        ],
        humanReviewed:false },
      { id:"ded_dist_sol_aristarque", year:-265, element:"deduction",
        name:"Le Soleil est ~19× plus loin que la Lune", author:"Aristarque",
        excerpt:"Sous-estimation notable mais méthode exacte — réalité : ~390× plus loin",
        description:`D'après sa mesure de 87°, Aristarque déduit que le Soleil est environ 19 fois plus loin que la Lune (réalité : ~390 fois). L'ordre de grandeur est néanmoins révolutionnaire et conduit Aristarque à proposer — en avance de 18 siècles sur Copernic — un modèle héliocentrique.
`,
        status:"partial", relatesTo:['exp_demi_lune'],
        refs:[
          { label:"Heath, T. L. (1913). Aristarchus of Samos. Oxford.", url:"https://archive.org/details/aristarchusofsam00arisuoft" }
        ],
        humanReviewed:false },
      { id:"instr_armillaire", year:-255, element:"instrument",
        name:"Sphère armillaire", author:"Ératosthène (attribuée), usage hellénistique",
        excerpt:"Anneaux représentant les grands cercles célestes — mesure d'angles entre astres",
        description:`La sphère armillaire est un instrument composé d'anneaux métalliques représentant les grands cercles de la sphère céleste. Elle permet de repérer la position des astres et de mesurer les angles entre eux. Elle restera l'instrument de référence jusqu'à l'invention du télescope.
`,
        status:"confirmed", relatesTo:[],
        refs:[
          { label:"Armillary sphere — Encyclopædia Britannica", url:"https://www.britannica.com/technology/armillary-sphere" }
        ],
        humanReviewed:false },
      { id:"instr_telescope", year:1609, element:"instrument",
        name:"Télescope astronomique", author:"Galilée (premier usage astronomique, 1609)",
        excerpt:"Révolutionne la mesure céleste — phases de Vénus, satellites de Jupiter",
        description:`Le télescope, adapté à l'astronomie par Galilée en 1609, transforme radicalement la précision des observations. Galilée observe les phases de Vénus et les satellites de Jupiter. Il ouvre la voie aux mesures de parallaxe planétaire.
`,
        status:"confirmed", relatesTo:[],
        refs:[
          { label:"Galilée — Sidereus Nuncius, 1610 (Gallica)", url:"https://gallica.bnf.fr/ark:/12148/bpt6k57692c" },
          { label:"Van Helden, A. (1977). The Invention of the Telescope. Trans. American Philosophical Society, 67(4)." }
        ],
        humanReviewed:false },
      { id:"measure_parallax_mars", year:1672, element:"measure",
        name:"Parallaxe de Mars → première UA fiable", author:"Giovanni Cassini & Jean Richer, 1672",
        excerpt:"Observation simultanée de Mars depuis Paris et Cayenne — ~140 M km",
        description:`En 1672, lors d'une opposition de Mars, **Cassini à Paris** et **Jean Richer à Cayenne** observent simultanément la position de Mars par rapport aux étoiles fixes. La légère différence angulaire (la parallaxe) permet de calculer la distance Terre–Mars, puis l'UA via les lois de Kepler.

**Résultat : ~140 millions de km** (réel : 149,6 M km) — soit ~7 % d'erreur, bien meilleur que toutes les estimations antérieures.

![Portrait de Giovanni Cassini](https://upload.wikimedia.org/wikipedia/commons/8/8a/Giovanni_Cassini.jpg)
*Giovanni Domenico Cassini — gravure du XVIIe siècle. [Source : Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Giovanni_Cassini.jpg), domaine public.*

![Schéma de la parallaxe de Mars](figures/measure_parallax_mars/parallaxe_mars.svg)
`,
        status:"confirmed", relatesTo:['instr_telescope', 'ded_dist_sol_aristarque'],
        refs:[
          { label:"Van Helden, A. (1985). Measuring the Universe. Univ. of Chicago Press." },
          { label:"Giovanni Cassini — Wikipedia", url:"https://fr.wikipedia.org/wiki/Giovanni_Cassini" }
        ],
        humanReviewed:false },
      { id:"exp_transit_venus", year:1761, element:"experiment",
        name:"Transits de Vénus (1761 & 1769)", author:"Halley (proposition 1716), expéditions internationales",
        excerpt:"Observer le transit de Vénus depuis des latitudes très éloignées pour calculer l'UA",
        description:`Halley réalise en 1716 qu'observer le transit de Vénus depuis deux points très éloignés permettrait de calculer la parallaxe solaire avec une précision inédite. Les expéditions de 1761 et 1769 mobilisent des astronomes sur tous les continents (dont Cook à Tahiti). Résultat : ~153 millions de km, soit ~2 % d'erreur.

![Schéma du transit de Vénus](figures/exp_transit_venus/transit_venus.svg)
`,
        status:"confirmed", relatesTo:['instr_telescope', 'measure_parallax_mars'],
        refs:[
          { label:"Woolf, H. (1959). The Transits of Venus. Princeton Univ. Press." },
          { label:"Transits of Venus — NASA GSFC", url:"https://eclipse.gsfc.nasa.gov/transit/venus.html" }
        ],
        humanReviewed:false },
      { id:"measure_radar", year:1961, element:"measure",
        name:"Mesure radar Terre–Vénus", author:"NASA / équipes soviétiques, 1961",
        excerpt:"Impulsions radar rebondies sur Vénus — mesure directe de l'UA à quelques km près",
        description:`En 1961, des équipes américaines et soviétiques rebondissent des impulsions radar sur Vénus et mesurent le délai aller-retour. Via la vitesse de la lumière, on obtient l'UA : 149 597 870,7 km — étalon adopté définitivement par l'UAI.
`,
        status:"confirmed", relatesTo:['exp_transit_venus'],
        refs:[
          { label:"Muhleman, D. O. et al. (1962). Radar cross-section of Venus. Astronomical Journal, 67." },
          { label:"Astronomical Unit — IAU", url:"https://www.iau.org/public/themes/measuring/" }
        ],
        humanReviewed:false },
    ],
  },
};

export { DOMAINS, TOPICS };