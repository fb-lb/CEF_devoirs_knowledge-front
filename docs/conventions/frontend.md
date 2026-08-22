# Conventions Frontend

## Composants

- composants standalone (pas de `NgModule`), imports explicites des dépendances utilisées
- un composant = un dossier avec `.ts`/`.html`/`.css`/`.spec.ts`
- composants de `pages/` : orchestration (appel des services, gestion des formulaires) + affichage
- composants de `components/` : purement réutilisables, pilotés par `@Input()`/`@Output()`, sans appel HTTP direct

## Gestion de l'état

- état partagé via des services injectables exposant des `BehaviorSubject`/`Observable` (pas de state manager externe, voir `docs/decisions.md`)
- état local de formulaire via `ReactiveFormsModule` (`FormGroup`/`FormControl`)
- après une mutation (POST/PATCH/DELETE), le service met à jour son `BehaviorSubject` pour que tous les abonnés se resynchronisent automatiquement

## Réactivité

- mettre à jour l'interface après une modification sans rechargement de page (déjà en place sur le back-office : listes recalculées via les observables des services après création/modification/suppression)
- privilégier l'`async` pipe ou une souscription explicite avec désabonnement propre (`ngOnDestroy`) plutôt qu'un rechargement complet

## Appels API

- centraliser les appels HTTP dans les services (`authentication.service`, `courses.service`, `user-courses`, `user.service`) — un composant n'appelle jamais `HttpClient` directement
- l'ajout du header d'authentification est géré automatiquement par `auth-interceptor.ts`, ne pas le refaire manuellement dans un service
- gérer systématiquement les erreurs HTTP : distinguer `HttpErrorResponse` (message backend) d'une erreur inattendue

## Formulaires

- validation côté client via `Validators` natifs + validators custom (`PasswordValidators`)
- toujours doublée d'une validation côté serveur (le frontend ne doit jamais être la seule barrière)
- affichage des messages d'erreur centralisé via `form.service.ts` (`getAllErrorMessages`)

## Interface utilisateur

- FontAwesome pour les icônes
- réutilisation des composants existants pour les interactions récurrentes (`WarningModal` pour toute suppression ou action à confirmer, pas de `confirm()` natif du navigateur)
- messages utilisateurs en français (voir `docs/conventions/common.md`)

## Performances

- pas de lazy loading actuellement (routes chargées eagerly) — à réévaluer si le nombre de pages augmente significativement
- filtrage/recherche des listes du back-office effectué côté client (volumétrie actuelle compatible)

## Invariants

- ne pas dupliquer un composant réutilisable existant (`WarningModal`, `StripePayment`, etc.)
- conserver une interface réactive après toute mutation de données
- ne jamais appeler `HttpClient` directement depuis un composant si un service existe pour ce domaine
- ne jamais recalculer côté client une donnée qui doit venir du backend (prix, rôles, statuts `isValidated`/`isCertified`)
