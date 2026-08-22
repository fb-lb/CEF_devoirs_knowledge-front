# Conventions Git

## Stratégie de branches

GitHub Flow : une branche dédiée par évolution, fusionnée dans `main` via Pull Request.

## Nommage des branches

Format observé : `<type>/<description_snake_case>/<numéro_issue>`

Exemples réels :
- `feature/add_all_courses_component/19`
- `feature/authentication_refactoring/37`
- `refactor/global_refactoring/41`

Types utilisés : `feature/...`, `refactor/...`.

## Commits

- format libre, en anglais
- messages descriptifs et précis : indiquer le fichier/composant concerné puis l'action effectuée et, si utile, le pourquoi

Exemple réel :
```
In back-office-purchases component : improve search filtration on userThemes, userCursus and userLessons.
Before, if user made a research, userThemes (for example) were filtered but if he updated data, data were
synchronized and new data appeared but not with user search filtration, now filtration is done even after
an update or a delete
```

- pas de Conventional Commits strict, mais toujours contextualiser le message par le fichier/composant modifié (`In X.ts : ...`)

## Pull Requests

- revue avant fusion
- résolution des conflits avant fusion
- description implicite via l'historique des commits (pas de template PR dédié observé)

## Fusion

Merge commit (pas de squash observé) : historique `Merge pull request #N from fb-lb/<branche>`.

## Releases

Pas de tags/releases versionnés observés. Le déploiement se fait directement depuis `main` (voir `docs/deployment.md`).

## Versionnement

Pas de SemVer applicatif dédié : le numéro de version dans `package.json` suit celui d'Angular CLI (généré, pas géré manuellement pour le projet lui-même).

## Invariants

- une branche par évolution, nommée `<type>/<description>/<numéro_issue>`
- ne jamais pousser directement sur `main`
- un commit doit rester compréhensible isolément : mentionner le fichier/composant et la raison du changement
