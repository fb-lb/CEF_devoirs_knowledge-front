---
description: Revoir le diff courant (stagé ou non) par rapport aux conventions du projet, sans rien modifier
argument-hint: [zone optionnelle à cibler, ex. "sécurité" ou "tests"]
allowed-tools: Bash(git diff:*), Bash(git status:*), Read, Grep, Glob
---

## Contexte

- Statut : !`git status --short`
- Diff non stagé : !`git diff`
- Diff stagé : !`git diff --cached`

## Tâche

Revoir les changements ci-dessus. Si `$ARGUMENTS` précise une zone (ex. "sécurité", "performance", "tests"), concentrer la revue dessus ; sinon, couvrir : lisibilité, gestion d'erreurs, cohérence avec les conventions du projet (`docs/conventions/`), couverture de tests.

Format de réponse :
- **Critique** (bloquant, à corriger avant merge)
- **Suggestions** (amélioration, non bloquant)
- **Points positifs** (courts, seulement si notables)

Ne pas modifier de fichier — cette commande est en lecture seule. Si une correction semble évidente, la décrire plutôt que l'appliquer.
