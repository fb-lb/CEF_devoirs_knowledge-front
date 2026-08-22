# Conventions Database

Ces conventions concernent le schéma géré par le backend (`knowledge-back`) — documentées ici pour la compréhension du contrat de données consommé par le frontend.

## Nommage

- tables au singulier, snake_case (`theme`, `cursus`, `lesson`, `element`, `user`, `user_theme`, `user_cursus`, `user_lesson`)
- clés étrangères en snake_case suffixées `_id` (`theme_id`, `cursus_id`, `lesson_id`, `user_id`, `element_id`)
- côté frontend, les mêmes données sont exposées en camelCase dans les interfaces TypeScript (`themeId`, `cursusId`, etc. — voir `src/app/core/models/api-response.model.ts`)

## Modèles et entités

- une entité par responsabilité métier claire : contenu (`theme`/`cursus`/`lesson`/`element`/`text`/`image`) séparé des entités d'accès utilisateur (`user_theme`/`user_cursus`/`user_lesson`)
- pas d'entité `Purchase`/`Payment` séparée : l'achat est matérialisé directement par la création des lignes d'accès (voir `docs/business-rules.md`)

## Identifiants

- auto-incrément (id numérique), pas d'UUID

## Colonnes communes

- `createdAt`/`updatedAt` automatiques (gérés par Sequelize)
- `createdBy`/`updatedBy` : traçabilité de l'admin auteur, sur la quasi-totalité des tables de contenu et d'accès

## Relations

- hiérarchie stricte à sens unique : Theme → Cursus → Lesson → Element → (Text | Image)
- relations d'accès utilisateur (`user_theme`/`user_cursus`/`user_lesson`) toujours rattachées à un `user_id` et à l'entité de contenu correspondante
- suppression en cascade SQL sur les relations d'accès (`ON DELETE CASCADE`), `SET NULL` sur `createdBy`/`updatedBy`

## Migrations

- gérées via `sequelize-cli` (fichiers `.cjs` dans `src/migrations/`)
- ne jamais modifier une migration déjà appliquée : en créer une nouvelle

## Requêtes

- éviter les requêtes N+1 lors des recalculs de cascade (validation/certification) : privilégier les requêtes groupées quand c'est possible

## Données sensibles

- mot de passe toujours haché (bcrypt), jamais renvoyé par l'API
- aucune donnée bancaire stockée en base : Stripe gère les données de paiement, le backend ne persiste que le résultat (accès créé ou non)

## Invariants

- aucune modification directe de la base hors migration
- les conventions de nommage snake_case (DB) / camelCase (API/front) sont respectées de façon cohérente
- l'intégrité référentielle de la hiérarchie de contenu et des accès utilisateur est toujours préservée
