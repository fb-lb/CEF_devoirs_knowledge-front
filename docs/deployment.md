# Déploiement

## Environnements

- **Développement** (`environment.ts`) : `backUrl: http://localhost:3000`, backend lancé en local.
- **Production** (`environment.prod.ts`) : `backUrl: https://knowledge-back-jrzv.onrender.com` (backend hébergé sur Render), frontend hébergé sur GitHub Pages.

Le swap dev/prod se fait via `fileReplacements` dans `angular.json` (configuration `production` de la target `build`), déclenché par `ng build --configuration production`.

Il n'existe pas d'environnement de recette/préproduction intermédiaire.

## Variables d'environnement

Deux variables par environnement, définies dans `src/environments/environment*.ts` :
- `backUrl` : URL de base de l'API backend
- `stripePublicKey` : clé publique Stripe (non sensible par nature, publiable côté client)

Ne jamais ajouter de secret réel (clé privée, identifiants) dans ces fichiers : ils sont inclus tels quels dans le bundle JavaScript livré au navigateur.

## Pipeline

Pas de pipeline CI/CD automatisé (aucun fichier `.github/workflows`). Le processus est manuel :

1. `npm install`
2. `npm test` (à exécuter manuellement avant déploiement)
3. `npm run build` → `ng build --configuration production --base-href /CEF_devoirs_knowledge-front/`
4. `npm run deploy` → `angular-cli-ghpages --dir=dist/knowledge-front/browser` (publie sur la branche `gh-pages`)

## Stratégie de déploiement

- Déclenchement manuel par le développeur, aucune validation automatique n'est appliquée avant publication.
- Le `--base-href` fixe correspond au chemin de publication GitHub Pages (`/CEF_devoirs_knowledge-front/`) — à ajuster si le nom du dépôt ou l'organisation de publication change.

## Rollback

- Pas de procédure de rollback automatisée. En cas de problème, revenir au commit précédent sur `main` et relancer `npm run build && npm run deploy` republie l'état antérieur sur `gh-pages`.
- Aucune donnée persistante côté frontend (pas de base de données) : un rollback frontend n'a pas d'impact sur les données back-end.

## Dépendances externes

Services nécessaires au fonctionnement en production :
- **Backend Express** (Render) : indispensable, toute l'app en dépend.
- **Stripe** : indispensable pour la fonctionnalité de paiement (le reste de l'app fonctionne sans, mais l'achat de cours est bloqué).
- **GitHub Pages** : hébergement statique du frontend.

## Invariants

- ne jamais déployer une version dont les tests unitaires échouent
- ne jamais commiter de secret dans `environment*.ts`
- vérifier que `backUrl` de l'environnement `production` pointe vers le bon backend avant tout déploiement
