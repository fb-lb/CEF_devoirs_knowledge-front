# Backend

Le backend (`knowledge-back`) est un dépôt séparé. Ce document décrit uniquement ce que le frontend doit savoir pour consommer son API correctement — pas l'implémentation interne (voir le dépôt backend pour ses propres conventions).

## Imports

Lire :
- `docs/conventions/backend.md`
- `docs/conventions/typescript.md`

## Vue d'ensemble

Le backend expose une API REST qui assure :
- l'authentification et la gestion des rôles (user/admin)
- la logique métier (achats, cascade de validation/certification, cf. `business-rules.md`)
- l'accès aux données (MySQL via Sequelize)
- l'intégration Stripe (création des payment intents)
- l'envoi d'emails (vérification de compte)

## Stack technique

### Runtime
Node.js (ESM)

### Framework
Express 5

### Langage
TypeScript

### Outils principaux
- ORM : Sequelize 6 (MySQL, driver `mysql2`)
- Authentification : `jsonwebtoken` + `bcrypt`
- Validation : validation manuelle (regex/contrôles), pas de lib type Joi/Zod
- Documentation API : pas de Swagger/OpenAPI — documentation générée via TypeDoc à partir des JSDoc

## Format des réponses

Toutes les réponses suivent l'enveloppe `ApiResponse<T>` (voir `src/app/core/models/api-response.model.ts` côté front) :

```json
{ "success": boolean, "message": string, "data"?: T }
```

Exception : les 404 génériques (route inexistante) renvoient un format différent `{ "error": "Not found", "message": "..." }`.

## Routes API principales

Base URL : `environment.backUrl` (voir `security.md`/config environnements). Toutes les routes sont préfixées par `/api`.

| Domaine | Exemples | Accès |
|---|---|---|
| Inscription | `POST /inscription`, `POST /inscription/check-email` | public |
| Authentification | `POST /authentification/connexion`, `GET /authentification/user`, `GET /authentification/admin` | public / user / admin |
| Utilisateurs | `GET /utilisateurs/tous`, `PATCH /utilisateurs/:id`, `DELETE /utilisateurs/:id`, `GET /utilisateurs/isVerified` | admin (sauf isVerified) |
| Contenu (theme/cursus/lesson/element) | `GET /content/theme/all` (public), `POST/PATCH/DELETE .../add|:id` (admin), réordonnancement `GET .../:id/:move` (admin) | public en lecture catalogue, admin en écriture |
| Images de contenu | `GET /content/element/image/private/:fileName/:token` | public mais protégé par token JWT dédié |
| Stripe | `POST /stripe/create-payment-intent` | user |
| Accès utilisateur (user-theme/user-cursus/user-lesson) | `POST /user-cursus/add`, `POST /user-lesson/add`, `GET .../some` (mes accès), `PATCH/DELETE :id` | user pour ses propres achats, admin pour la gestion globale (voir exception ci-dessous) |

Exception notable : `PATCH /user-lesson/:userLessonId` est accessible à un simple `user` (seule route de modification d'accès ouverte au rôle user, toutes les autres routes `PATCH`/`DELETE` d'accès sont réservées `admin`).

Il n'existe pas de route `POST /user-theme/add` : un `UserTheme` ne se crée qu'en cascade depuis l'achat d'un cursus (voir `business-rules.md`).

## Authentification vue du front

- Le token JWT doit être envoyé dans le header `Authorization: Bearer <token>` sur chaque requête protégée (géré par `auth-interceptor.ts`, pas besoin de le faire manuellement dans les services).
- Le backend **régénère un nouveau token à chaque requête authentifiée** et le renvoie dans le header `Authorization` de la réponse (rolling token, pas de refresh token séparé). Le frontend doit donc relire ce header sur chaque réponse et resynchroniser son état (`authInterceptor` + `authenticationService.connected()` s'en chargent déjà).
- Expiration du token : 1h. Un utilisateur inactif plus d'1h sans requête protégée sera déconnecté au prochain appel (le back renverra une erreur d'auth).

## Paiement Stripe : ce que le front doit garantir

Il n'y a **aucun webhook Stripe côté backend**. La création de l'accès (`UserCursus`/`UserLesson`) est déclenchée par un appel explicite du frontend (`POST /api/user-cursus/add` ou `/api/user-lesson/add`) **après** confirmation du paiement côté client (`stripe.confirmCardPayment`). Le frontend porte donc la responsabilité de ne jamais appeler ces endpoints avant confirmation effective — voir `stripe-payment.ts`.

## Gestion des erreurs

Le backend utilise une classe unique `AppError` avec un `status` HTTP et un `messageFront` destiné à l'affichage utilisateur. Le format d'erreur renvoyé au frontend est toujours `{ success: false, message: string }` (sauf 404 générique, voir plus haut). Le frontend doit afficher `error.error.message` (structure `HttpErrorResponse` d'Angular) plutôt qu'un message générique quand disponible.
