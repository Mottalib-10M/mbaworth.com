# Écrire ou étoffer une page de AdmitCost (us-college-cost)

Notice pour les agents qui écrivent ou prolongent le site. À lire en entier avant d'écrire, avec
`~/Documents/GitHub/RECETTE-SITE.md` (§0, §6, §6.5, §7, §9.3, §11, §17.4, §21, §26).

Le site : taux d'admission, fourchettes SAT/ACT, prix affiché et **prix net par tranche de revenu** pour
110 universités américaines, avec un simulateur « mes chances et mon prix net » sans compte ni e-mail,
un comparateur de 2 à 3 universités et la conversion ACT/SAT. **Anglais américain seul**, sous `/en/`.
Dollars, `$` devant, virgule des milliers. Éditeur : la société **Radif Partners** (jamais un nom de
personne, ni photo, ni INSEAD, ni Mines, ni LinkedIn). Aucun lien vers un autre site du portefeuille
(`_trame/domaines-ovh.txt`), en particulier **jamais studentloanledger.com** (prêts étudiants, sujet voisin
qu'on ne doublonne pas : pas de page FAFSA, SAI, prêts, remboursement).

**L'angle** : chaque chiffre a son cycle et sa source. Les concurrents (empowerly, collegeadvisor,
collegevine, test-ninjas) affichent un cycle périmé, un taux arrondi sans source, ou exigent un compte.

## D'où viennent les chiffres (règle 5 : rien d'inventé)

| Donnée | Source | Fichier |
|---|---|---|
| Taux d'admission automne 2024, SAT/ACT 25e-75e, droits 2024-25, coût et **prix net par revenu 2023-24**, diplomation, dette, revenus | College Scorecard, fichier du 10 juin 2026 (IPEDS ; CC BY / domaine public). Années : onglet « Most_Recent_Inst_Cohort_Map » du dictionnaire | `src/data/scorecard.json` (`scripts/build-data.py`, brut dans `.cache-raw/`) |
| Dernier cycle (automne 2025, classe 2029), scores du cycle, politique de test 2026-27, GPA, budget 2026-27 (ou 2025-26), promesse d'aide, calendriers, faits propres | Documents de chaque université (Common Data Set, admissions, financial aid), lus un par un | `research/schools/<slug>.json` → `src/data/latest/<slug>.json` (`python3 scripts/build-latest.py`, qui refuse un fichier mal formé) |
| Table de concordance ACT/SAT 2018, chiffres SAT classe 2026, ACT classe 2025, règle reach/target/likely, tranches de revenu, sources | College Board, ACT | `src/data/params-2026.json` |

Consignes de recherche : `research/BRIEF-RECHERCHE.md`. Liste des 110 : `research/schools.tsv`.
Licence des données : College Scorecard publié sur data.gov sous attribution (CC BY), IPEDS œuvre fédérale
(domaine public, 17 U.S.C. 105) ; Common Data Set et pages des universités : on reprend des **faits**
(un effectif, un montant) avec la source et la date, jamais un tableau entier ni une mise en page.

Logique de choix (`src/lib/data.ts`) : le cycle le plus récent lu dans les documents de l'université
l'emporte sur le Scorecard ; à défaut, le taux fédéral automne 2024 est affiché **et daté**. Fourchette SAT :
composite du CDS si publié, sinon somme des percentiles de section (marquée « approximation »). Écoles
test-free (UC, CSU) : aucune fourchette, le score est ignoré.

## Les fichiers d'une page

| Page | Fichier | Route |
|---|---|---|
| Université | `src/content/colleges/<slug>.ts` (`defineCollege`) | `/en/colleges/<slug>/` |
| Outil ou guide | `src/content/pages/<id>.ts` (`definePage`) | `/en/<slug>/` |
| Accueil | `src/content/home.ts` | `/en/` |

Modèle : `src/content/colleges/harvard.ts`. Copier la **structure**, jamais les phrases.

Le composant `CollegePage.astro` affiche seul : le simulateur verrouillé sur l'école, la bande de chiffres,
le chapeau replié (`resume`, première phrase visible), le corps (`body`), les faits du fichier de recherche
(« From X's own documents »), puis les tableaux générés (prix net par revenu, budget, admissions par cycle,
scores, résultats) en `data-chrome`. **La prose ne recopie pas ces tableaux** : elle explique ce qu'ils
veulent dire pour cette école.

### Champs d'une page université (`defineCollege`)

| Champ | Règle |
|---|---|
| `slug` | = nom du fichier = slug de `research/schools.tsv` |
| `title` | 50 à 60 caractères, contient 2026, **commence par `s.short` ou `s.name`** (« UCLA Acceptance Rate 2026: … », « NYU Tuition 2026 and Acceptance Rate: … » pour les écoles où « tuition » est cherché : USC, NYU, UCLA, Harvard). Pas de tiret cadratin. Unique |
| `description` | 150 à 160 caractères, 2026, au moins un chiffre lu au kit. Unique |
| `intro` | une phrase, avec le chiffre clé |
| `resume` | **UN** paragraphe de 120 mots ou plus (viser 130 à 170) : taux du dernier cycle avec les effectifs et la classe, fourchette de scores ou politique test-free, prix affiché, prix net d'au moins deux tranches. La première phrase porte le message |
| `body(h)` | HTML (`h2`, `p`, `ul`). **300 mots de prose ou plus** hors tableaux (viser 350 à 450), écrits pour cette école : ce qui la rend singulière (admission par college ou par major, règle automatique du Texas, part de résidents, Early Decision, promesse d'aide, co-op, garantie de droits…). Deux à quatre `h2` **propres à l'école** (jamais le même titre d'une école à l'autre). **Au moins un mini-simulateur**, placé **juste avant un `<h2>`** (jamais entre deux paragraphes : `check-layout` y voit un trou) |
| `faqs` | 3 à 5 vraies questions **contenant `s.short` ou `s.name`**, réponses de **45 à 85 mots** (le test compte 42 à 88), chiffre + condition + source, uniques sur tout le site |
| `related` | 3 à 6 ids : écoles voisines (`college:ucla`) qui ont une page, outils (`compare-colleges`, `net-price-calculator`, `acceptance-rates`, `what-is-a-good-sat-score`, `act-to-sat-conversion`, `college-tuition`, `cost-of-attendance`, `act-scores`) |

## La règle des chiffres (non négociable)

Aucun chiffre présent dans les données ne se tape en dur : on le lit avec le kit (`src/lib/kit.ts`,
importé `KIT as K` dans le fichier, et passé au corps sous `h`).

```ts
const s = K.s('ucla');          // tout : s.name, s.short, s.state, s.control, s.adm {rate, applicants, admitted, label, newer},
                                // s.sat {p25,p75,p50,label,approx}, s.actR, s.testStatus ('required'|'optional'|'blind'|'other'|'unknown'),
                                // s.sticker {year,total,outTotal}, s.netByIncome[0..4], s.tuitionIn/Out (2024-25), s.coa (2023-24),
                                // s.grad6, s.retention, s.earn10, s.debt, s.undergrads, s.pell, s.latest (fichier de recherche brut)
K.rate('ucla')        // "8.97%" (2 décimales sous 10 %)      K.oneIn('ucla')     // 11
K.net('ucla', 2)      // prix net tranche 0..4, formaté      K.netRaw('ucla', 2)
K.netAt('ucla', 120000, false)  // { band, shown, total (avec l'écart hors État), outOfStateGap }
K.satRange('ucla') K.actRange('ucla') K.sticker('ucla') K.stickerOut('ucla')
K.satPos('harvard', 1500)  // part des inscrits sous ce score (0..1)   K.label(rate, pos)
K.actToSat(30) K.satToAct(1400) K.satBelow(1200) K.rankAdm('ucla') // { rank, of }
K.usd(x) K.num(x) K.pct(0.379) → "37.9%" K.listOf([...]) K.meta.years.net → "2023-24"
```

Dans `body(h)` : tout le kit, plus
- `h.c(slug, texte)` lien vers une université (un slug sans page fait échouer le test) ; `h.a(id, texte)` lien interne ;
- `h.table(...)`, `h.ext(url, texte)`, `h.src(clé)`, `h.box(titre, html)` ;
- mini-simulateurs prêts : `h.miniNet(slug)`, `h.miniScore(slug, 'SAT'|'ACT')` (pas pour une école test-free ni sans fourchette),
  `h.miniGap(slug)` (publique seulement), `h.miniGrant(slug)`, `h.miniFour(slug)`, `h.miniSatNational()`, `h.miniActSat()`.

Un chiffre lu dans `s.latest` (fichier de recherche) s'écrit par son champ (`s.latest!.cost!.total`,
`s.latest!.cycle!.applicants`). Un chiffre qui n'existe que dans le texte d'un fait (`facts[].text`,
`aidPromise.text`, ex. « $200,000 ») peut s'écrire tel quel, **sans le changer**. Un chiffre absent des
fichiers ne s'écrit pas. Ne rien affirmer que le fichier de recherche ne dit pas (taux ED/RD, part de
résidents, règle d'admission automatique) : sinon le lire vous-même sur la source officielle, l'ajouter
au fichier `research/schools/<slug>.json` (`facts`, avec l'URL), relancer `build-latest.py`.

Quand `s.adm.newer` est faux (pas de cycle 2025 lu), écrire « the fall 2024 entering class, the newest
federal figure » et ne pas parler de classe 2029.

## Ton et langue

- Anglais américain, voix humaine, phrases de longueur variable, **le chiffre d'abord**.
- Interdits (le test les refuse) : tirets cadratin et demi-cadratin (« 2025-26 » s'écrit avec le trait
  d'union simple), « it's important to note », « dive into », « delve », « whether you're »,
  « navigate the », « Moreover », « Additionally », « Furthermore », « game changer », « unlock ».
  Pas de triplets en série, pas de conclusion qui résume, pas d'émoji.
- Honnêteté : un taux décrit une cohorte passée ; un prix net est une moyenne d'étudiants aidés, pas une offre.
  Jamais « your chances are X % ».
- **Unicité** (§6) : `check-unique` compare toutes les pages, chiffres neutralisés, seuil 30 %. Ouvrir le
  corps sur ce que l'école a de plus rare ; aucune tournure reprise d'une autre page ni d'un autre site.
  Les FAQ ne suivent pas un gabarit commun (« What is X's acceptance rate? » ne doit pas devenir la même
  réponse à 110 reprises) : chaque réponse dit quelque chose de propre à l'école.

## Contrôles (tous à 0)

```bash
cd ~/Documents/GitHub/a-publier/Mottalib-10M/us-college-cost
python3 scripts/build-latest.py
PAGE_FILES=college:ucla,college:usc npx vitest run tests/pages.test.ts   # une ou plusieurs pages
npx vitest run                                                          # tout
npm run build                        # inclut typo-nbsp et check-snippets (bloquant)
export NODE_PATH=$(npm root -g):$PWD/node_modules
S=~/Documents/GitHub/_trame/_template/scripts
python3 $S/check-seo.py . ; python3 $S/check-trame.py . ; python3 $S/check-simulateurs.py .
python3 $S/check-unique.py dist ; python3 $S/check-portefeuille.py . ; python3 $S/check-regles.py .
node $S/check-sources.mjs . ; node scripts/check-legal.mjs . ; node scripts/typo-nbsp.mjs dist --check
node $S/check-contraste.mjs dist ; node $S/check-saisie.mjs dist --max=60 ; node $S/check-nombres.mjs dist
node $S/check-url-propre.mjs dist ; node $S/check-premier-ecran.mjs . ; python3 $S/check-cookies.py .
node $S/check-layout.mjs dist > /tmp/layout-ucc.log 2>&1 &     # long : en arrière-plan
```

Serveur local : `npx astro preview --port 4447`. Pour l'arrêter : `lsof -ti tcp:4447 | xargs kill`
(jamais `pkill -f` avec un motif court).

## Mise à jour annuelle

1. Juin : nouveau fichier College Scorecard → `.cache-raw/`, `python3 scripts/build-data.py`, mettre à jour
   `meta.years` (dictionnaire, onglet Most Recent) et la date de publication.
2. Printemps-automne : chaque nouveau Common Data Set → `research/schools/<slug>.json`, `build-latest.py`.
3. Septembre-octobre : rapports SAT (College Board) et ACT de la nouvelle classe → `params-2026.json` (renommer
   au millésime) ; vérifier qu'aucune nouvelle table de concordance n'est sortie.

## Ce qu'on ne fait pas

Pas de dépôt GitHub ni de push sans validation de l'éditeur, pas de DNS, pas de Chrome. Ne pas toucher à
`_trame` ni à la RECETTE. Monétisation : `ADS_ENABLED` reste à `false`.

## État au 2026-10-13

- **60 pages d'université** écrites et validées ; les 110 établissements de `research/schools.tsv` sont tous dans le simulateur, le comparateur et les tableaux (données College Scorecard), avec un lien seulement quand la page existe.
- **Recherche faite, page à écrire** (5) : uiuc, ohio-state, penn-state, rutgers, umd.
- **Recherche et page à faire** (45) : johns-hopkins, notre-dame, tulane, villanova, fordham, george-washington, american-university, howard, byu, university-of-washington, virginia-tech, william-and-mary, uga, clemson, south-carolina, alabama, auburn, lsu, tennessee, kentucky, arizona, arizona-state, cu-boulder, oregon, utah, iowa, minnesota, indiana, michigan-state, purdue, mizzou, oklahoma, arkansas, texas-tech, uh, cal-poly, sdsu, csulb, binghamton, stony-brook, umass-amherst, uconn, pitt, temple, nc-state.
- Pour une école : `research/BRIEF-RECHERCHE.md` (étape 1), puis ce document (étape 2), puis `sh scripts/check-page.sh college:<slug>` (n'affiche que les assertions en échec) et la série complète des contrôles. Le test `ALL_COLLEGES=1 npx vitest run` vérifie que les 110 pages existent.
- Plafond : 110 pages d'université + 8 outils + accueil, à propos, méthode = 121 pages indexables (≤ 150).
- **Chrome est interdit** sur ce projet. Certains sous-agents l'ont utilisé pour lire des documents bloqués (Brown, Williams, Amherst, MIT, NYU, Michigan, UVA) avant la consigne ; Brown a été repris sans ces lectures, MIT relu à curl. À la revue annuelle, relire ces documents par curl ou WebFetch.
- Faits « From X's own documents » : un fait inversé a été trouvé et corrigé (Miami, taux par résidence). Tout fait comparatif (« higher rate », « unlike most ») se recalcule depuis les effectifs avant publication.
