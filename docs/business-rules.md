# Règles métiers

Ce document décrit les règles fonctionnelles importantes du projet. Ces règles sont appliquées par le backend (source de vérité) ; le frontend doit les respecter dans son UX (désactiver des actions impossibles, afficher les bons messages) mais ne doit jamais les recoder de façon divergente.

## Concepts métier

### Utilisateur

Un compte utilisateur (`UserData`, `src/app/core/models/api-response.model.ts`). Attributs importants :
- `email` (identifiant de connexion, unique)
- `password` (jamais renvoyé par l'API, haché côté back)
- `roles` : tableau pouvant contenir `"user"` et/ou `"admin"` (un compte peut cumuler les deux rôles)
- `isVerified` : compte activé ou non (voir vérification email)

### Contenu pédagogique : Thème → Cursus → Leçon → Élément

Hiérarchie à 4 niveaux :
- **Thème** : regroupe des cursus autour d'un sujet.
- **Cursus** : regroupe des leçons, possède un `price` (achetable individuellement).
- **Leçon** : possède un `price` (achetable individuellement), contient des éléments.
- **Élément** : contenu affiché dans une leçon, de type `text` (titre1/titre2/titre3/paragraphe) ou `image` (avec accès protégé par token, voir `security.md`).

Chaque niveau a un `order` (affichage ordonné, réordonnable en back-office) et une traçabilité `createdBy`/`updatedBy` (référence à l'admin auteur).

### Accès utilisateur (achat) : UserTheme / UserCursus / UserLesson

Tables de jonction qui matérialisent ce qu'un utilisateur possède :
- `UserTheme.isCertified` : l'utilisateur est certifié sur le thème.
- `UserCursus.isValidated` : l'utilisateur a validé le cursus.
- `UserLesson.isValidated` : l'utilisateur a validé la leçon.

Ces enregistrements sont créés par l'achat (Stripe) ou par un ajout manuel en back-office, jamais par une simple consultation.

## Règles générales

### Règle : Achat en cascade

Un achat de cursus (`POST /api/user-cursus/add`) crée automatiquement :
1. le `UserCursus` correspondant ;
2. un `UserLesson` pour **chaque leçon** du cursus ;
3. le `UserTheme` parent si l'utilisateur n'en possède pas déjà un pour ce thème.

Impact : frontend (afficher l'accès complet immédiatement après paiement), backend (logique de cascade), base de données (lignes créées dans 3 tables).

Un achat déjà existant n'est jamais recréé (idempotence silencieuse côté back).

### Règle : Cascade de validation ascendante (bas → haut)

- `UserCursus.isValidated` passe à `true` uniquement si l'utilisateur possède **toutes** les leçons du cursus et que toutes ses `UserLesson.isValidated` sont vraies.
- `UserTheme.isCertified` passe à `true` uniquement si l'utilisateur possède **tous** les cursus du thème et que tous ses `UserCursus.isValidated` sont vrais.

Ce recalcul est automatique côté back après chaque modification d'une leçon/cursus. Impact : frontend (l'état `isValidated`/`isCertified` peut changer sans action directe de l'admin sur cette entité précise — ne pas supposer qu'une leçon non modifiée ne peut pas voir son cursus parent recalculé).

### Règle : Cascade de validation descendante (haut → bas)

Quand un admin certifie/décertifie manuellement un `UserTheme`, la même valeur est répercutée sur tous les `UserCursus` et `UserLesson` de cet utilisateur pour ce thème. C'est la raison de l'avertissement affiché dans `back-office-purchases` avant cette action (composant `WarningModal`).

### Règle : Prix non fiable côté client

Le prix payé via Stripe est toujours recalculé côté serveur à partir du prix stocké en base (jamais transmis/fait confiance depuis le front). Impact : frontend (n'affiche le prix qu'à titre indicatif, ne le transmet pas à l'API stripe autrement que pour information).

### Règle : Vérification email obligatoire

À l'inscription, `isVerified=false`. Un lien de confirmation (token JWT 24h) est envoyé par email. Tant que le compte n'est pas vérifié, le frontend doit interroger `GET /api/utilisateurs/isVerified` et adapter l'UX (page `email-check`) en conséquence.

## Cycle de vie des entités

### Accès utilisateur (UserTheme / UserCursus / UserLesson)

```
(inexistant)
  → créé (achat Stripe ou ajout manuel back-office)
  → isValidated/isCertified = false ou true (recalcul automatique)
  → supprimé (cascade descendante, voir ci-dessous)
```

Règles :
- une suppression de `UserLesson` peut entraîner la suppression du `UserCursus` parent si c'était sa dernière leçon possédée, puis du `UserTheme` si c'était son dernier cursus.
- une suppression de `UserCursus` supprime toutes les `UserLesson` associées de l'utilisateur, puis éventuellement le `UserTheme` parent.
- une suppression de `UserTheme` supprime en cascade tous les `UserCursus`/`UserLesson` de l'utilisateur pour ce thème.
- la suppression d'un contenu (thème/cursus) par un admin supprime d'abord les accès utilisateurs liés (`UserTheme`/`UserCursus`), puis recalcule la certification des utilisateurs restants concernés.

C'est pourquoi chaque suppression dans `back-office-purchases` est précédée d'une `WarningModal` explicite mentionnant l'impact en cascade.

## Permissions et rôles métier

### Administrateur (`roles` contient `"admin"`)

Peut :
- gérer les contenus (thèmes, cursus, leçons, éléments) : créer, modifier, réordonner, supprimer
- gérer les utilisateurs : lister, modifier, supprimer
- gérer les accès utilisateurs (back-office-purchases) : certifier/valider manuellement, ajouter/supprimer un accès

### Utilisateur standard (`roles` contient `"user"`)

Peut :
- consulter le catalogue de cours public
- acheter un cursus ou une leçon (paiement Stripe)
- consulter les cursus/leçons qu'il possède, suivre sa progression et ses certifications
- modifier certains de ses accès (seule route où un simple user a un droit de modification côté back : `PATCH /api/user-lesson/:userLessonId`)

Un même compte peut cumuler les deux rôles (le tableau `roles` n'est pas exclusif).

## Cas particuliers

- **Suppression d'un utilisateur** : gérée en back-office avec confirmation via modale d'avertissement (voir historique récent des commits sur `back-office-users`). Les suppressions en cascade de ses accès (`UserTheme`/`UserCursus`/`UserLesson`) suivent les contraintes `ON DELETE CASCADE` en base.
- **Aucun webhook Stripe côté backend** : la confirmation d'achat (création des `UserCursus`/`UserLesson`) est déclenchée par un appel du frontend après confirmation du paiement côté client (`stripe.confirmCardPayment`), et non par un événement serveur-à-serveur Stripe. Le frontend a donc une responsabilité métier réelle ici : ne jamais appeler `/api/user-cursus/add` ou `/api/user-lesson/add` avant confirmation effective du paiement par Stripe.
- **Accès aux images de contenu** : protégé par un token JWT dédié (`JWT_IMAGE_SECRET`, 30 jours), pas par la session utilisateur classique.

## Règles à ne pas casser

- un achat de cursus doit toujours entraîner l'accès à toutes ses leçons (cascade) ;
- une validation/certification ne doit jamais être positionnée à `true` si l'utilisateur ne possède pas l'intégralité des sous-éléments requis ;
- le prix facturé doit toujours provenir du serveur, jamais du client ;
- une suppression en cascade (contenu ou accès) doit rester cohérente avec les enregistrements réellement dépendants (ne pas laisser d'orphelins `UserCursus`/`UserLesson` sans `UserTheme`, etc.) ;
- un compte non vérifié ne doit pas être traité comme pleinement actif côté UX.
