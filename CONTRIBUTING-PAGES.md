# Écrire ou étoffer une page de MBA Worth (mba-worth)

Notice pour les agents qui écrivent ou prolongent le site. À lire en entier avant d'écrire, avec
`~/Documents/GitHub/RECETTE-SITE.md` (§0, §6, §6.5, §7, §9.3, §11, §17.4, §21, §26).

Le site : coût total d'un MBA (frais, budget de vie, salaire perdu), délai de remboursement, VAN sur 10 ans,
et **notre** classement des écoles par industrie, segment de la finance, région et fonction, calculé sur les
rapports d'emploi des écoles. Rubriques métiers : conseil (dont le conseil en stratégie), finance (banque
d'affaires, private equity, gestion d'actifs), tech. **Anglais seul**, sous `/en/`. Montants affichés en
dollars US (taux BCE du build) et, sur les fiches, dans la devise de l'école. Éditeur : la société
**Radif Partners** (jamais un nom de personne, ni photo, ni LinkedIn ; l'éditeur n'a aucun lien déclaré avec une
école). Aucun lien vers un autre site du portefeuille (`_trame/domaines-ovh.txt`). Domaine de travail
mbaworth.com, non acheté (URL provisoire `https://mbaworth.com`).

## D'où viennent les chiffres (règle 5 : rien d'inventé)

| Donnée | Source | Fichier |
|---|---|---|
| Frais, budget de vie, profil de classe, rapport d'emploi (salaire, part par industrie, région, fonction, employeurs), rang FT cité | Documents de chaque école, lus un par un par les agents de collecte (URL + date par bloc) | `research/schools/<slug>.json` → `src/data/schools.json` (`python3 scripts/build-schools.py`) |
| Décisions de lecture d'un fichier (lignes sœurs à additionner…) | nous, avec la raison | `research/normalize.json` |
| Taux de change, salaires BLS OEWS (mai 2025), plancher visa UK, hypothèses du modèle (salaire de référence, croissances, actualisation, poids du score, seuils) | BCE, BLS (API), GOV.UK ; hypothèses du site | `src/data/params-2026.json` (`python3 scripts/build-params.py`, bruts dans `research/official/`) |

**On ne modifie jamais `research/schools/*.json`** (écrits par les agents de collecte). Une lecture à corriger
passe par `research/normalize.json` ou par `scripts/build-schools.py`.

Classements tiers (FT, QS, US News, Bloomberg) : **un** rang cité par école, en texte avec lien (fait par
`SchoolPage.astro` à partir de `rankings_cited`). Jamais de tableau, de colonne, de tri ni de « top N » selon eux.

## Les fichiers d'une page

| Page | Fichier | Route |
|---|---|---|
| École | `src/content/schools/<slug>.ts` (`defineSchool`) | `/en/schools/<slug>/` |
| Outil, classement, métier, guide, comparatif | `src/content/pages/<id>.ts` (`definePage`) | `/en/<slug>/` |
| Accueil | `src/content/home.ts` | `/en/` |

Modèles : `src/content/schools/wharton.ts` et `src/content/pages/mba-finder.ts`. Copier la **structure**,
jamais les phrases.

`SchoolPage.astro` affiche seul : le calculateur verrouillé sur l'école, la bande de chiffres, le chapeau replié
(`resume`, première phrase visible), le corps (`body`), la place de l'école dans nos classements, le rang FT cité,
puis les tableaux générés (coût, rapport d'emploi, industries, régions, fonctions, employeurs, profil, ce qui manque)
en `data-chrome`. **La prose ne recopie pas ces tableaux** : elle dit ce qu'ils signifient pour cette école.

### Champs d'une page école (`defineSchool`)

| Champ | Règle |
|---|---|
| `slug` | = nom du fichier = nom du fichier de `research/schools/` |
| `title` | 50 à 60 caractères, contient 2026, **commence par `s.short`** (« INSEAD MBA Cost 2026: … », « LBS MBA 2026: Fees, Salary … »). Pas de tiret cadratin. Unique |
| `description` | 150 à 160 caractères, 2026, au moins un chiffre lu au kit. Unique |
| `intro` | une phrase avec le chiffre clé |
| `resume` | **UN** paragraphe de 120 mots ou plus (130 à 170) : coût du programme, coût total pour la personne de référence, salaire (avec sa nature : médiane de base, moyenne…), délai, ce qui distingue l'école. Si l'école ne publie pas de salaire ou de budget, le dire ici |
| `body(h)` | HTML (`h2`, `p`, `ul`). **300 mots de prose ou plus** hors tableaux (350 à 450), écrits pour cette école, 2 à 4 `h2` **propres à l'école**. **Au moins un mini-simulateur, placé juste avant un `<h2>` ou en fin de corps** (le test le vérifie) |
| `faqs` | 3 à 5 vraies questions **contenant `s.short` ou `s.name`**, réponses de **45 à 85 mots**, chiffre + condition, uniques sur tout le site |
| `related` | 3 à 6 ids : autres écoles qui ont une page (`school:lbs`), outils et classements (`mba-finder`, `compare-mba`, `best-mba-consulting`…) |

### Champs d'une page (`definePage`)

`id` (= nom du fichier), `group` (`tools` · `best` · `consulting` · `finance` · `tech` · `guides` · `compare`),
`order`, `slug` (après `/en/`, une barre possible : `consulting/mckinsey-salary` ; la page pilier a `id` = `slug`
= `consulting`, `finance` ou `tech`), `nav` (libellé court), `card` (une ligne), `title` 50 à 60 caractères avec 2026,
terme-clé en tête, jamais « Best », « Top », « How », « What » en premier mot ; `description` 150 à 160 avec 2026 ;
`h1` ; `intro` (une phrase) ; `resume` (un paragraphe de 120 mots ou plus, la réponse directe chiffrée) ;
`faqs` 4 à 8 (42 à 88 mots chacune, questions uniques sur le site) ; `body(h)` **450 mots de prose ou plus** hors
tableaux, au moins un mini juste avant un `<h2>` ; `tool` + `toolArgs` ; `related` (3 ids ou plus qui existent) ;
`sources` (clés de `params-2026.json > sources`) ; `schoolSources` (slugs d'écoles dont les documents fondent la
page : leurs liens s'ajoutent aux sources) ; `extSources` (pages officielles lues pour un fait hors données :
site d'un cabinet, d'un régulateur ; `{ label, url }` en https). Au moins 3 sources au total.

Outils (`tool`) : `roi` (calculateur d'école ; `toolArgs.school`, `toolArgs.goal`), `cost`, `payback` (avec prêt),
`worth`, `finder` (classeur école × objectif ; `toolArgs.goal`, `length: 'one'|'two'`, `where`), `salary`
(classeur trié par salaire), `compare` (`toolArgs.schools: ['insead', 'hec-paris']`), `case` (`toolArgs.mode`:
`sizing`, `breakeven`, `profit`), `bls` (`toolArgs.mode` = code BLS `131111`, `132051`, `413031`, `113031`,
`112021`, `113021`, `151252`, `111021`, `152051`), `project` (honoraires d'une mission, saisis par l'utilisateur).

Objectifs (`lib/goals.ts`) : `all`, `consulting`, `finance`, `tech`, `healthcare`, `consumer`, `energy`,
`manufacturing`, `ib`, `pe`, `vc`, `am`, `z-us`, `z-europe` (Europe + UK), `z-uk`, `z-asia`, `z-me`, `z-latam`,
`z-canada`, `z-africa`, `z-oceania`, `f-consulting`, `f-product`, `f-general`, `f-marketing`, `f-corpfin`,
`f-operations`, `f-bizdev`, `f-analytics`.

## La règle des chiffres (non négociable)

Aucun chiffre présent dans les données ne se tape en dur : on le lit avec le kit (`src/lib/kit.ts`, importé
`KIT as K`, et passé au corps sous `h`). Pour voir ce que le kit sait :
`DIGEST=insead,lbs npx vitest run tests/digest.test.ts` (écrit `digest.txt`) ; `DIGEST=rank …` donne nos
classements par objectif.

```ts
const s = K.s('insead');        // l'école normalisée : s.name, s.short, s.city, s.months, s.cur, s.tuition {v, cohort, url},
                                // s.fees, s.living {v, basis 'school'|'visa'}, s.emp {cohort, salary {v, cur, kind}, bonus, intern,
                                // industries[], segments[], zones[], functions[], employers[]}, s.profile, s.ranks
K.c('insead')                   // la même en dollars (ce que voient les calculateurs)
K.tuition('insead') "€109,860"  K.tuitionUsd  K.fees  K.living  K.livingUsd  K.direct (frais + vie, devise école)  K.directUsd
K.salary('insead') "€100,000"   K.salaryKind('insead') "median base salary"   K.salaryUsd
K.cost('insead') coût total de la personne de référence (salaire perdu compris), en $   K.costRaw
K.roi('insead', goalId?, s0?)   objet complet : total, forgone, direct, payback, npv, roi   (null si salaire ou budget manquant)
K.payback('insead', 'consulting') "2.9 years" ou null      K.npv('insead')  "$…"
K.share('insead', 'consulting') "50%" ou null   K.shareRaw   K.segSalary('lbs', 'consulting') "£98,856" ou null
K.rank('insead', 'consulting') { rank, of } dans NOTRE classement, ou null   K.top('consulting', 5) lignes classées
K.ranking('z-asia') { ranked, unranked: [{slug, share, why}] }   K.withRoi() écoles classables
K.ft('insead') { ranking, rank, url } ou null   K.employers('insead', 6)   K.intl('insead')
K.ref() "$90,000"  K.MODEL (hypothèses)  K.P.bls.occupations['131111'] {name, p25, median, p75, employment}
K.usd(x) K.money(x, 'EUR') K.num(x) K.p(28.2) "28.2%" K.pct(0.282) K.yrs(3.42) "3.4 years" K.day(iso) K.listOf([...])
```

Dans `body(h)` : tout le kit, plus `h.a(id, texte)` (lien interne ; un id inconnu fait échouer le test),
`h.sc(slug, texte?)` (lien vers une école si sa page existe, sinon son nom), `h.table(...)`,
`h.rankTable(goalId, n)` (notre classement en tableau), `h.ext(url, texte)`, `h.src(clé)`, `h.box(titre, html)`,
et les minis :

| Mini | Appel |
|---|---|
| délai pour votre salaire, une école | `h.miniPayback(slug)` (l'école doit avoir salaire et budget) |
| part et salaire par objectif, une école | `h.miniGoal(slug)` (l'école doit publier industries ou régions) |
| deux écoles | `h.miniTwo(a, b)` |
| bourse | `h.miniScholarship(slug)` |
| conversion de devise | `h.miniFx()` |
| salaire face aux percentiles BLS | `h.miniPosition('131111')` |
| sans argument | `h.mini('loan')`, `h.mini('forgone')`, `h.mini('emba')`, `h.mini('sizing')`, `h.mini('breakeven')`, `h.mini('bonus')`, `h.mini('response')` |

Une école sans salaire publié ou sans budget de vie n'a pas de délai : `K.roi` renvoie `null`. **Toujours tester**
avant d'écrire (`K.roi(slug) ? … : …`), dire que l'école ne publie pas le chiffre, et ne pas utiliser `miniPayback`.
Un fait qui n'est que dans une note du fichier de recherche (`s.emp.salaryMissing`, `s.livingMissing`) peut être
paraphrasé, sans changer les chiffres. Un chiffre absent des fichiers ne s'écrit pas ; un fait hors données (année
de fondation d'un cabinet, nombre de bureaux) se lit sur la page officielle, se cite dans `extSources` et s'écrit
tel qu'elle le donne.

## Ton et langue

- Anglais (orthographe américaine), voix humaine, phrases de longueur variable, **le chiffre d'abord**.
- Interdits (le test les refuse) : tirets cadratin et demi-cadratin (« 2025-26 » avec un trait d'union simple),
  « it's important to note », « dive into », « delve », « whether you're », « navigate the », « Moreover »,
  « Additionally », « Furthermore », « game changer », « unlock », « landscape », « tapestry », « seamless ».
  Pas de triplets en série, pas de conclusion qui résume, pas d'émoji, pas de superlatif sans chiffre.
- Honnêteté : un salaire décrit une promotion passée ; une moyenne n'est pas une médiane ; un délai est le
  résultat d'un modèle. Jamais « you will earn ».
- **Unicité** (§6) : `check-unique` compare toutes les pages, chiffres neutralisés, seuil 30 %. Ouvrir sur ce que
  l'école ou le sujet a de plus rare ; aucune tournure reprise d'une autre page.

## Contrôles

```bash
cd ~/Documents/GitHub/a-publier/Mottalib-10M/mba-worth
python3 scripts/build-schools.py                                         # après un nouveau fichier école
PAGE_FILES=school:insead,mba-finder npx vitest run tests/pages.test.ts    # vos pages seulement
npx vitest run                                                          # tout
```

Le build et les contrôles de la factory (`check-seo`, `check-unique`, `check-layout`…) sont lancés par le
coordinateur : un agent rédacteur **ne lance pas `astro build`** (plusieurs agents écrivent en même temps).

Serveur local : `npx astro preview --port 4471`. Pour l'arrêter : `lsof -ti tcp:4471 | xargs kill`
(jamais `pkill -f` avec un motif court).

## Mise à jour annuelle

1. Septembre à décembre : nouveaux rapports d'emploi et frais → `research/schools/<slug>.json`, puis
   `python3 scripts/build-schools.py` (il signale toute période qu'il ne comprend pas).
2. Taux BCE et salaires BLS : `curl -s https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml >
   research/official/ecb-eurofxref-<date>.xml`, appel de l'API BLS (séries OEWS dans `research/official/`),
   puis `python3 scripts/build-params.py`.
3. Renommer `params-2026.json` au millésime et relire chaque page qui cite une classe ou une année.

## Ce qu'on ne fait pas

Pas de dépôt GitHub ni de push sans validation de l'éditeur, pas de DNS, pas de Chrome. Ne pas toucher à
`_trame` ni à la RECETTE. Monétisation : aucun emplacement publicitaire actif (au plus 3 par page le jour où l’éditeur les ouvre).

## État au 2026-10-13

- **129 pages indexables** (plafond 150) : accueil, index des écoles, méthode, À propos ; 7 outils ; 12 « Best MBA for… » ;
  14 pages conseil ; 4 finance ; 2 tech ; 5 guides ; 6 comparatifs ; **75 fiches école** (une par fichier de recherche).
- Rapport SERP : `~/Documents/GitHub/reports/mba-worth-serp-2026-10-13.md`.
- Lectures faites dans un navigateur par le coordinateur (pages fermées aux robots) : `research/overrides/` (Harvard,
  Columbia, Ivey, Oxford, NUS, Melbourne, HEC). Décisions de lecture : `research/normalize.json` (PPP de Warwick,
  Imperial, RSM ; nature des salaires IIM, ISB, IMD, ESMT, Bocconi, NUS ; enquête HKUST écartée ; budget IIMB partiel ;
  salaire SMU 2019 écarté ; frais NYU et EDHEC).
- **À relire** (notes des collecteurs `research/schools/_a-relire*.md`) : classements FT relevés sur des copies tierces ;
  Michigan Ross (frais 2025-26 sur copie Wayback) ; SJTU (industries de la classe 2016) ; Mannheim (classe 2023) ;
  ESSEC (aucun chiffre publié) ; écoles sans budget de vie (IESE, IE, CEIBS, IIM, NUS, SMU, Rice, USC, WashU…).
- `check-sources` : une URL morte reste citée dans une note d'un collecteur (CUHK, ancien rapport 2020, signalé comme
  disparu) ; `typo-sources --check` relève des tirets dans les notes des collecteurs (`research/schools/_*.md`,
  `tuck.json`). Ces fichiers ne sont pas publiés et ne se modifient pas ici.
