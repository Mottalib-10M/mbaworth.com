# À relire (lot monde, collecte du 2026-10-13, sans Chrome)

Écoles ou blocs illisibles par curl / WebFetch (anti-robot, formulaire, image, liseuse) et ce qui manque.

| École | Blocage | Ce qui manque | Où le relire |
|---|---|---|---|
| HEC Paris | rapport 2025 dans une liseuse Calameo privée (URL de pages signées) | salaires, secteurs, employeurs classe 2025 (la classe 2024 est dans `employment_previous`) | https://www.calameo.com/read/0074570460be6b03185d2?authid=oF5iZhXRIwMR |
| ESSEC | rapport 25-26 et brochure derrière formulaire ; bloc « Financing » vide dans le HTML reçu | frais, budget de vie, effectif, tout le rapport d'emploi | https://info.essec.edu/GMBA-GTC-Employment-Report_1-GMBA-Download-Employment-Report-25-26.html |
| INSEAD | curl 403 (WebFetch passe) | bourses ; promotion à laquelle se rapporte le profil (âge 29, 38 % de femmes) | page programme INSEAD |
| Oxford Saïd | sbs.ox.ac.uk et ox.ac.uk 403 (curl et WebFetch), PDF lisibles | frais, acompte et coût de la vie vus seulement en extrait de recherche ; bourses, âge, GMAT | pages fees / living costs de sbs.ox.ac.uk |
| Imperial | rapport Class of 2025 derrière formulaire HubSpot | secteurs, géographie, fonctions, employeurs, % à 3 mois, taille de classe | page employment report Imperial |
| Cambridge Judge | PDF derrière formulaire, récupéré à l'adresse publique wp-content/uploads/2026/04/hdn-mba-2026-employment-report.pdf | association 73/80 % (3 mois) déduite de la mise en page ; écart conseil 19 % (web) / 17 % (PDF) | PDF dans `sources/` |
| Mannheim | rapports Class of 2023 et Fast Track 2024 sur formulaire (mbs.tfaforms.net) | industries (parts), fonctions, géographie, salaires par secteur | formulaire Mannheim |
| ESMT Berlin | page du rapport 403 ; rapport 2026 sur formulaire | industries, fonctions, salaire de base (seule la rémunération totale moyenne est publiée), % à 3 mois | /mba-programs/employment-report-download |
| Warwick | aucun rang FT mondial sur une page de l'école | rang FT pris dans l'extrait ClearAdmit (70 ex aequo) | — |
| UCD Smurfit | aucun rapport d'emploi trouvé | tout le bloc emploi sauf la liste d'employeurs | — |
| IESE | rapport 2025 derrière formulaire | salaires, budget de vie, taux de réponse | iese.edu career impact |
| Esade | rapport 2025 derrière formulaire | salaires, industries, géographie | esade.edu |
| IE | carte de géographie avec codes internes au lieu des régions (49,8 / 24,11 / 15,42 / 5,53 / 5,14 %) | noms des régions, salaire, cohorte, bourses | page carrières IE |
| SDA Bocconi | parts par industrie publiées seulement en graphique | parts exactes (lues à ±1 point dans `pct_approx_from_chart`, `pct` = null) | page employment report Bocconi |
| Lisbon MBA (nova-sbe) | thelisbonmba.com anti-robot | frais détaillés, bourses, rapport d'emploi, profil | thelisbonmba.com |
| Vlerick | aucun rapport d'emploi publié | salaire, secteurs, cohorte | — |
| KAIST | site coréen non fouillé ; frais génériques (tous masters, 2023) | emploi, profil, frais propres au MBA ; fiche presque vide (coût seulement ou à retirer) | site coréen KAIST |
| SKK GSB | données en images | taille de cohorte, salaire de sortie (le 147 152 $ PPP affiché est le chiffre FT à 3 ans) | site SKK GSB |
| Guanghua (PKU) | aucun rapport d'emploi après 2019 ; liste « 就业报告 » vide ; certificat refusé par WebFetch (curl -k passe) | tout l'emploi ; rang FT pris chez ClearAdmit / P&Q | compte WeChat de l'école ? |
| SJTU Antai | pas de rapport IMBA après 2016 | emploi récent, profil, frais 2026-27 | — |
| Fudan | aucun salaire publié | salaire, taux de réponse, budget de vie (logement en images de 2018) | — |
| NUS | mba.nus.edu.sg anti-robot (curl, WebFetch et Wayback bloqués) | page carrières (secteurs, géographie, employeurs, cohorte), profil, frais obligatoires | mba.nus.edu.sg |
| HKUST | rapport complet derrière formulaire Mailchimp | salaire de base annuel (seul le mensuel brut de l'enquête GES est publié), détail par secteur | mbaoffice.hkust.edu.hk/career-report |
| CUHK | site en JavaScript, brochure sur formulaire, anciens PDF en 404 | emploi, profil, bourses | mba.cuhk.edu.hk |
| HKU | aucun salaire publié | salaire, taux de réponse | — |
| NTU Nanyang | rapport derrière formulaire `nanyang-mba-career-report-download` | secteurs, fonctions, géographie, effectif, salaire (seul un « average alumni salary » non daté est affiché) | formulaire NTU |
| SMU | pages employment-report bloquées (Incapsula) | rapport plus récent que 2019, budget de vie | business.smu.edu.sg / masters.smu.edu.sg |
| Melbourne BS | tout mbs.edu et la page career-outcomes de l'université en 403 | frais à confirmer (112 536 AUD vu en extrait, national ou international ?), budget, bourses, emploi, profil, rang FT | mbs.edu |
| AGSM (UNSW) | seule la hausse de 69 % est publiée | salaire, fonctions, géographie, employeurs | — |
| IIM Bangalore | pages HTML 403, PDF lisibles | frais 2026-27 et bourse vus seulement en extrait de recherche (2025-26 confirmés par la brochure) | iimb.ac.in/programmes/epgp/financial-aid-scholarships |
| IIM Calcutta | brochure derrière formulaire ; rapport de la 19e promotion non publié | frais, bourses, budget de vie, fonctions, géographie | https://www.iimcal.ac.in/mbaex-brochure-download-2024-25 |
| IIM Lucknow | profil IPMX-19 seulement en image (« Batch Flyer.jpg ») | âge, part de femmes ; salaire par secteur, géographie | site IIM Lucknow |
| ISB | camemberts du PDF 2025 sans lien étiquette-valeur | parts complètes par secteur (seuls conseil 37 %, tech 28 %, BFSI 12 % repris), géographie | PDF dans `sources/` |
