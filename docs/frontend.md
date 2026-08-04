# Frontend

## Imports

Lire :
- `docs/conventions/frontend.md`
- `docs/conventions/typescript.md`

## Vue d'ensemble

Le frontend est responsable de :
- l'interface utilisateur (espace public, espace utilisateur connecté, back-office admin)
- la communication avec le backend via services HTTP dédiés
- la gestion de l'état d'authentification et de la progression utilisateur côté client
- l'intégration du paiement Stripe (Stripe Elements)

## Stack technique

### Framework
Angular 22, en **standalone components** (pas de `NgModule`).

### Langage
TypeScript

### Style
CSS par composant (`*.css` associé à chaque composant), FontAwesome pour les icônes.

### Outils principaux
- gestion d'état : `BehaviorSubject`/`Observable` (RxJS) dans des services injectables, pas de state manager externe (pas de NgRx)
- requêtes API : `HttpClient` avec un intercepteur unique (`auth-interceptor.ts`)
- formulaires : `ReactiveFormsModule` (`FormGroup`/`FormControl`), validators custom (`PasswordValidators`)
- composants UI : composants réutilisables maison (`warning-modal`, `stripe-payment`, `update-user-form`, `user-courses-top-main`)

## Structure du frontend

```
src/app/
├── app.config.ts / app.routes.ts / app.ts / app.html   → bootstrap et routes
├── components/                                         → composants réutilisables transverses
│   ├── footer/, header/
│   ├── stripe-payment/                                 → intégration Stripe Elements
│   ├── update-forms/update-user-form/
│   ├── user-courses-top-main/
│   └── warning-modal/                                  → modale de confirmation générique
├── core/
│   ├── errors/AppError.ts                              → format d'erreur applicatif
│   ├── interceptors/auth-interceptor.ts                → gestion du token sur chaque requête
│   └── models/api-response.model.ts                    → toutes les interfaces API
├── guards/                                              → not-auth-guard, user-auth-guard, admin-auth-guard
├── pages/
│   ├── all-courses/, certifications/, email-check/, home/, login/, register/, not-found/
│   ├── back-office/
│   │   ├── back-office-contents/                       → CRUD thèmes/cursus/leçons/éléments
│   │   ├── back-office-purchases/                      → gestion des accès (userTheme/userCursus/userLesson)
│   │   └── back-office-users/                           → gestion des comptes
│   └── user-courses/
│       ├── user-themes/, user-cursus/, user-lessons/, user-elements/
├── services/                                            → authentication, courses, form, stripe-loader, user-courses, user
└── validators/password.validators.ts
```

Rôle des principales parties :

**Components** : blocs UI réutilisables à travers plusieurs pages (pas de logique métier serveur).

**Pages** : composants routés, un par écran/fonctionnalité. Contiennent l'orchestration (appels services, gestion des formulaires, affichage des erreurs).

**Services** : accès à l'API backend et état partagé côté client. Deux familles distinctes à ne pas confondre :
- `CoursesService` : catalogue global (toutes les données de contenu, utilisé par `all-courses` et le back-office).
- `UserCourses` : progression/accès de l'utilisateur courant (thèmes/cursus/leçons qu'il possède, navigation courante).

**State management** : pas de store centralisé — chaque service expose ses propres `BehaviorSubject` (`isAuthenticated$`, `allThemes$`, `currentTheme$`, etc.), consommés via `async` pipe ou souscription dans les composants.

## Architecture frontend

- pas de séparation stricte composants "présentation"/"conteneur" : les composants de `pages/` portent à la fois logique et affichage, ceux de `components/` restent réutilisables et pilotés par `@Input`/`@Output`.
- organisation par feature (pages regroupées par domaine : back-office, user-courses).
- favoriser une interface réactive : les listes du back-office se resynchronisent automatiquement via les observables des services après une opération (création/modification/suppression), sans rechargement de page.
- maintenir la cohérence entre l'état de l'interface et les données du backend : après une mutation (PATCH/DELETE), le service met à jour son `BehaviorSubject` local pour que tous les composants abonnés reflètent immédiatement le nouvel état.

## Flux de données

```
Utilisateur
  ↓
Composant (page)
  ↓
Service (CoursesService / UserCourses / AuthenticationService / UserService)
  ↓
HttpClient + auth-interceptor
  ↓
API Backend (knowledge-back)
  ↓
Mise à jour du BehaviorSubject du service
  ↓
Affichage (via observable, async pipe ou souscription)
```

## Principes d'organisation

- composants réutilisables limités à l'affichage et à l'émission d'événements (`WarningModal`, `StripePayment`)
- logique métier limitée au frontend : uniquement de l'orchestration UX (l'état `isValidated`/`isCertified` réel vient toujours du backend, jamais recalculé côté client)
- tous les appels HTTP passent par un service dédié (aucun composant n'appelle `HttpClient` directement)
- gestion des erreurs répétée dans chaque composant (`try/catch` + distinction `HttpErrorResponse`) — pas de service d'erreur centralisé pour l'instant (voir `security.md` pour la limite connue de cette approche)

## Gestion des dépendances

Dépendances autorisées :

```
Composant → Service frontend → API Backend
```

Dépendance non autorisée :

```
Composant → Backend / Base de données directement
```
