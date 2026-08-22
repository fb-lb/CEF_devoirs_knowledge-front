# Sécurité

## Authentification

JWT émis par le backend. Stocké côté frontend dans `localStorage` sous la clé `token` (format complet `Bearer <token>`, voir `authentication.service.ts`).

Particularité importante : le backend régénère un **nouveau token à chaque requête authentifiée** et le renvoie dans le header `Authorization` de la réponse (rolling token, pas de refresh token dédié). L'intercepteur (`src/app/core/interceptors/auth-interceptor.ts`) :
- ajoute `Authorization: Bearer <token>` sur chaque requête sortante si un token est présent ;
- relit le header `Authorization` de chaque réponse et resynchronise l'état (`authService.connected()`), avec un anti-spam de 2s (`freezeTokenRefresh()`) pour éviter les mises à jour en boucle ;
- force la déconnexion (`authService.disconnected()`) si le backend renvoie une erreur 500 spécifique de vérification de token échouée.

Décodage JWT côté front via `jwt-decode` — décodage seulement, aucune vérification cryptographique côté client (normal : c'est le rôle exclusif du backend).

Expiration du token utilisateur : 1h. Token de vérification email : 24h. Token d'accès aux images privées : 30 jours (secret dédié, distinct du secret d'authentification).

## Autorisation

Modèle par rôles : `User.roles` est un tableau (`"user"`, `"admin"`, cumulables). Trois guards de routing s'appuient sur un appel réseau réel (pas seulement la présence du token) :
- `notAuthGuard` : bloque l'accès à login/register si un token est déjà présent en localStorage (vérification locale, sans appel réseau).
- `userAuthGuard` : vérifie `GET /api/authentification/user` — redirige si échec.
- `adminAuthGuard` : vérifie `GET /api/authentification/admin` — redirige si échec.

Ainsi, même si un token est manipulé côté client, l'accès réel aux routes protégées et aux données dépend systématiquement d'une validation serveur à chaque navigation.

## Gestion des secrets

- Aucun secret backend (clés JWT, clé Stripe secrète, identifiants base de données) n'est présent dans ce dépôt frontend.
- Le frontend n'a besoin que d'une clé **publique** Stripe (`environment.stripePublicKey`), stockée dans `src/environments/environment.ts` (dev) et `environment.prod.ts` (prod) — ce n'est pas un secret par nature (clé publiable côté client par design Stripe).
- Ne jamais ajouter de secret (clé privée, identifiants back-office, etc.) dans les fichiers `environment*.ts` : ils sont inclus dans le bundle livré au navigateur.

## Données sensibles

- Mot de passe : jamais stocké ni loggé côté frontend, saisi via formulaire réactif avec validation stricte (`PasswordValidators`).
- Token JWT : stocké en `localStorage` (accepté ici faute d'alternative avec cookies HttpOnly côté backend actuel — voir `decisions.md` pour l'arbitrage) ; à ne jamais logger en clair côté client.
- Accès aux images de contenu : protégé par un token dédié dans l'URL, pas par la session classique.

## Communications

- HTTPS en production (`environment.prod.ts` pointe vers une URL `https://`).
- CORS restreint côté backend à l'URL exacte du frontend (`FRONT_URL`).
- Un middleware CSRF côté backend bloque toute requête non-GET dont l'`Origin` ne correspond pas exactement au frontend attendu.

## Journalisation

- Le frontend loggue les erreurs HTTP en `console.error` avec un commentaire récurrent `// add external service like Sentry to save the error` — aucun service de monitoring d'erreurs n'est branché actuellement. Point d'attention si le volume d'erreurs en production doit être surveillé.
- Ne jamais logger un mot de passe, un token complet ou une donnée personnelle sensible dans la console.

## Invariants

Ne jamais :
- stocker un secret backend (clé privée, identifiants DB) dans ce dépôt frontend
- désactiver la validation d'un formulaire pour contourner une contrainte métier
- appeler un endpoint d'ajout d'accès (`/api/user-cursus/add`, `/api/user-lesson/add`) avant confirmation réelle du paiement Stripe côté client
- faire confiance à un prix ou à un rôle transmis depuis le client sans validation serveur (déjà garanti côté backend, ne pas dupliquer une logique de confiance côté front)

Toujours :
- laisser le backend être l'unique source de vérité pour les rôles et les prix
- relire le header `Authorization` de chaque réponse HTTP (déjà fait par l'intercepteur — ne pas le contourner dans un nouveau composant)
