# Décisions techniques

Ce document présente les choix techniques importants du projet et leurs justifications.

Les détails d'implémentation sont documentés dans les fichiers concernés.

## Format des décisions

### [Titre de la décision]

Date :
[YYYY-MM-DD]

Statut :
- Acceptée
- Remplacée
- En réflexion

### Contexte

Quel problème ou besoin a conduit à cette décision ?

### Décision

Quel choix a été retenu ?

### Alternatives étudiées

Quelles autres solutions ont été envisagées ?

### Raisons du choix

Pourquoi cette solution a été préférée ?

### Conséquences

Quels sont les avantages, contraintes ou compromis induits ?

## Décisions

### Angular en standalone components (sans NgModule)

Date : 2026-01-01 (structure du projet depuis sa création)

Statut : Acceptée

Contexte :

Le projet démarre sur une version récente d'Angular (22), qui recommande l'API standalone plutôt que les `NgModule`.

Décision :

Tous les composants, guards et intercepteurs sont écrits en standalone (`bootstrapApplication`, `provideHttpClient`, `provideRouter` dans `app.config.ts`).

Alternatives étudiées :
- architecture classique par `NgModule` (feature modules, `SharedModule`).

Raisons du choix :

Réduction du boilerplate, alignement avec les recommandations actuelles d'Angular, pas de bénéfice identifié à réintroduire des `NgModule` pour la taille de ce projet.

Conséquences :
- imports explicites par composant (chaque composant standalone importe directement ce dont il a besoin) ;
- pas de lazy loading par module actuellement (routes toutes chargées eagerly, voir `app.routes.ts`).

### Authentification par JWT dans le header `Authorization`, stocké en `localStorage`

Date : voir commit `aaa8af6` ("Refactoring of authentication from using token cookie to using token in Authorization header")

Statut : Acceptée (remplace un fonctionnement antérieur par cookie)

Contexte :

Le projet utilisait initialement un cookie pour transporter le token d'authentification.

Décision :

Le token est transmis via le header `Authorization: Bearer <token>` sur chaque requête (intercepteur HTTP dédié), et stocké côté client dans `localStorage`. Le backend régénère un nouveau token à chaque requête authentifiée (rolling token), renvoyé dans le header `Authorization` de la réponse.

Alternatives étudiées :
- cookie de session (HttpOnly) — solution initiale, abandonnée.

Raisons du choix :

Simplification du flux d'authentification côté frontend (pas de gestion CORS/cookie cross-domain entre le frontend GitHub Pages et le backend Render), contrôle explicite du header sur chaque requête via l'intercepteur.

Conséquences :
- le token est accessible en JavaScript (`localStorage`), donc plus exposé à un XSS qu'un cookie `HttpOnly` — compromis assumé, à surveiller (voir `security.md`) ;
- nécessite un intercepteur qui relit systématiquement le header de réponse pour resynchroniser le token.

### Pas de state manager externe (pas de NgRx)

Statut : Acceptée

Contexte :

Le projet a besoin de partager un état (authentification, catalogue de cours, progression utilisateur) entre plusieurs composants.

Décision :

L'état est géré par des services injectables exposant des `BehaviorSubject`/`Observable` (RxJS natif), sans librairie de state management dédiée.

Alternatives étudiées :
- NgRx (store centralisé, pattern Redux).

Raisons du choix :

La complexité des états à partager reste limitée (quelques entités, pas de logique de state machine complexe) ; RxJS natif suffit et évite une dépendance et un boilerplate supplémentaires.

Conséquences :
- plusieurs services d'état distincts à connaître (`AuthenticationService`, `CoursesService`, `UserCourses`, `UserService`) plutôt qu'un store unique ;
- à réévaluer si la complexité de synchronisation entre ces services augmente significativement.

### Confirmation d'achat déclenchée côté client (pas de webhook Stripe)

Statut : Acceptée (contrainte héritée du backend)

Contexte :

Après un paiement Stripe réussi, il faut créer les accès utilisateur (`UserCursus`/`UserLesson`) côté backend.

Décision :

Le frontend appelle explicitement `POST /api/user-cursus/add` ou `/api/user-lesson/add` après confirmation du paiement via `stripe.confirmCardPayment`, sans webhook serveur-à-serveur Stripe.

Alternatives étudiées :
- webhook Stripe (`payment_intent.succeeded`) traité côté backend, plus robuste (fonctionne même si le client se ferme après paiement).

Raisons du choix :

Simplicité de mise en œuvre pour la portée actuelle du projet.

Conséquences :
- si l'utilisateur ferme l'onglet juste après le paiement Stripe mais avant l'appel d'ajout d'accès, le paiement peut être prélevé sans que l'accès soit créé (risque fonctionnel identifié, à traiter par un webhook si le projet évolue vers plus de robustesse transactionnelle).

### Déploiement GitHub Pages sans pipeline CI/CD automatisé

Statut : Acceptée

Contexte :

Le projet a besoin d'un hébergement simple pour le frontend statique.

Décision :

Déploiement manuel via `angular-cli-ghpages` (`npm run deploy`), qui build puis pousse le contenu sur la branche `gh-pages`.

Alternatives étudiées :
- pipeline CI/CD (GitHub Actions) avec déploiement automatique sur merge.

Raisons du choix :

Suffisant pour la portée actuelle (projet d'étude / petite volumétrie), pas de contrainte de fréquence de déploiement.

Conséquences :
- pas de vérification automatique (tests/build) avant déploiement — le déploiement dépend de la discipline manuelle du développeur (voir `deployment.md`, `workflow.md`).
