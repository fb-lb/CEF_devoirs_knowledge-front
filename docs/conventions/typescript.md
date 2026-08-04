# Conventions TypeScript

## Nommage

- variables/fonctions : camelCase (`retrieveAllThemes`, `checkIsVerified`)
- classes/interfaces/types : PascalCase (`AuthenticationService`, `UserData`, `ApiResponse<T>`)
- fichiers : kebab-case correspondant au sélecteur/à la classe (`authentication.service.ts`, `back-office-purchases.ts`)
- constantes de configuration : camelCase dans les objets `environment` (`backUrl`, `stripePublicKey`)

## Types

- les données API sont modélisées par des `interface` (pas de classes de modèle avec méthodes), centralisées dans `src/app/core/models/api-response.model.ts`
- unions discriminées utilisées pour les variants (`ElementData` : `type: 'text' | 'image'`)
- éviter `any` : les réponses HTTP sont typées via `ApiResponse<T>`

## Fonctions

- guards écrits comme fonctions (`CanActivateFn`), pas de classes de guard
- services organisés en méthodes courtes, une responsabilité par méthode (`retrieveAllThemes`, `retrieveAllCursus`, etc. plutôt qu'une méthode générique)

## Asynchronisme

- `async/await` privilégié pour les enchaînements de logique (ex. flux de paiement Stripe dans `stripe-payment.ts`)
- `Observable`/RxJS pour l'état partagé et réactif (services), pas pour du séquencement ponctuel
- toujours gérer l'erreur (`try/catch` autour des appels HTTP asynchrones, distinction `HttpErrorResponse`)

## Gestion des erreurs

- `AppError` (`src/app/core/errors/AppError.ts`) comme format d'erreur applicatif dédié quand une erreur métier front doit être levée
- ne jamais lancer une simple chaîne de caractères comme erreur

## Immutabilité

- les `BehaviorSubject` exposés sont accédés en lecture via `Observable` (pas d'exposition directe du subject en écriture depuis l'extérieur du service)

## Imports

- imports relatifs classiques (pas d'alias de chemin configuré à ce jour)
- imports Angular/librairies en premier, puis imports internes du projet

## Invariants

- éviter `any` sans justification
- conserver un typage explicite sur les interfaces de données API (`src/app/core/models/api-response.model.ts` reste la source de vérité des formes de données)
- privilégier un code simple et fortement typé plutôt qu'une abstraction générique prématurée
