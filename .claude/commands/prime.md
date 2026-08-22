---
description: Amorcer rapidement le contexte en début de session en lisant les fichiers clés du projet
allowed-tools: Read, Bash(git log:*), Bash(git status:*)
---

## Contexte à charger

- README : @README.md
- Architecture : @docs/architecture.md
- 5 derniers commits : !`git log --oneline -5`
- Statut actuel : !`git status --short`

## Tâche

Faire un résumé bref (5-8 lignes) de : ce qu'est le projet, son état actuel (branche, changements en cours), et tout point d'attention visible (ex. changements non commités depuis longtemps, TODO critiques visibles dans les fichiers lus). Ne pas relire l'intégralité de `docs/` — seulement ce qui est référencé ci-dessus. Ce résumé sert de point de départ à la session, pas de rapport exhaustif.
