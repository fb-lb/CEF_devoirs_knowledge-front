# Base de données

La base de données appartient au backend (`knowledge-back`) — le frontend n'y accède jamais directement (voir `architecture.md`, dépendance interdite Frontend → Database). Ce document décrit le schéma tel qu'il conditionne les données manipulées par le front (via `src/app/core/models/api-response.model.ts`).

## Imports

Lire :
- `docs/conventions/database.md`

## SGBD

- MySQL (driver `mysql2`)

ORM / ODM utilisé côté backend :
- Sequelize 6 (+ `sequelize-cli` pour migrations/seeders)

## Schéma (vue front)

```
Theme 1──N Cursus 1──N Lesson 1──N Element 1──1 (Text | Image)

User 1──N UserTheme (isCertified)
User 1──N UserCursus (isValidated)
User 1──N UserLesson (isValidated)

UserTheme  → theme_id, user_id
UserCursus → cursus_id, user_id
UserLesson → lesson_id, user_id
```

- `Element.type` (`text` | `image`) détermine la table liée en 1:1 (`Text` ou `Image`).
- `Text.type` : `title1` | `title2` | `title3` | `paragraph`.
- Chaque table de contenu (`theme`, `cursus`, `lesson`, `element`, `text`, `image`) porte `createdBy`/`updatedBy` référençant `user.id` (traçabilité admin).
- Pas de table `Purchase`/`Payment` : l'achat Stripe n'est pas persisté en tant que tel, seule la création des lignes `UserTheme`/`UserCursus`/`UserLesson` matérialise l'accès (voir `business-rules.md`).

## Principes

- une table représente une entité métier (thème, cursus, leçon, élément, utilisateur, accès)
- toute modification passe par l'ORM Sequelize côté backend
- les migrations sont versionnées (`sequelize-cli`, fichiers `.cjs`)
- les contraintes d'intégrité (clés étrangères) sont définies en base

## Identifiants

- Auto-incrément (id numérique), pas d'UUID.

## Gestion des suppressions

- Suppression physique (pas de soft delete) sur les tables de contenu et d'accès.
- Suppression en cascade SQL (`ON DELETE CASCADE`) sur les FK `user_id`/`theme_id`/`cursus_id`/`lesson_id` des tables `user_theme`/`user_cursus`/`user_lesson`.
- Suppression en cascade **applicative** en plus de la cascade SQL : supprimer un `UserLesson` peut déclencher la suppression du `UserCursus` parent puis du `UserTheme` s'ils deviennent orphelins (logique métier, pas une contrainte SQL — voir `business-rules.md`).
- `createdBy`/`updatedBy` utilisent `ON DELETE SET NULL` (la suppression d'un admin ne supprime pas l'historique des contenus qu'il a créés).

## Performances

- Pas de pagination observée sur les listes actuelles (listes filtrées/recherchées côté client dans le back-office) — point de vigilance si le volume de données augmente significativement.
- Les vérifications de cascade (validation/certification) impliquent des requêtes multiples par écriture ; acceptable au volume actuel du projet.

## Invariants

- préserver l'intégrité référentielle (un `UserCursus` ne doit jamais exister sans `UserTheme` parent, un `UserLesson` sans `UserCursus` parent)
- ne jamais contourner l'ORM depuis le frontend (aucun accès direct n'est possible ni prévu)
- respecter le sens des dépendances : Frontend → Backend → Base de données, jamais l'inverse ni de saut direct
