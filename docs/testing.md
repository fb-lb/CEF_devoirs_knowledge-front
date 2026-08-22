# Tests

## Stratégie

- Tests unitaires uniquement (composants, services, guards, validators). Pas de tests d'intégration ni End-to-End actuellement.

## Outils

- Jasmine + Karma (`ng test`), lancés dans Chrome via `karma-chrome-launcher`.
- Couverture disponible via `karma-coverage`.

## Organisation

- Un fichier `*.spec.ts` colocalisé à côté de chaque fichier testé (convention Angular CLI standard), ex. `authentication.service.spec.ts` à côté de `authentication.service.ts`.
- Environ 31 fichiers de test à ce jour, couvrant la quasi-totalité des composants/services/guards générés par le CLI.

## Données de test

- Pas de fixtures/factories partagées identifiées : les données de test sont définies localement dans chaque `*.spec.ts`.
- Les appels HTTP sont mockés via `HttpClientTestingModule`/`HttpTestingController` (pattern standard Angular), pas de vraie base de données de test côté front.

## Politique de tests

À tester en priorité :
- guards (`user-auth-guard`, `admin-auth-guard`, `not-auth-guard`) : cas d'accès autorisé/refusé
- validators (`PasswordValidators`) : cas limites de mot de passe
- services d'état (`authentication.service`, `user-courses`, `courses.service`) : transitions d'état après connexion/déconnexion, synchronisation des données
- composants back-office : logique de cascade métier visible côté front (confirmation avant suppression/certification)

## Exécution

- Tests unitaires : `npm test` (alias de `ng test`)
- Un seul fichier : `ng test --include='**/nom-du-fichier.spec.ts'`
- Couverture : `ng test --code-coverage`

## Invariants

- les nouveaux comportements doivent être testés, en particulier la logique de cascade UX (confirmations, resynchronisation d'état après mutation)
- corriger un bug implique d'ajouter un test de non-régression lorsque c'est pertinent
- les tests restent indépendants de tout état réseau réel (mocks HTTP systématiques)
- ne pas tester la logique métier serveur (cascade de validation/certification) côté front : elle appartient au backend et à ses propres tests
