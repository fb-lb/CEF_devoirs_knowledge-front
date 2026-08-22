---
description: Créer un commit Git à partir des changements stagés, avec un message conforme aux conventions du projet
argument-hint: [message optionnel]
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git add:*), Bash(git commit:*), Bash(git branch:*)
disable-model-invocation: true
---

## État actuel

- Statut : !`git status --short`
- Diff stagé : !`git diff --cached`
- Branche : !`git branch --show-current`

## Tâche

Si rien n'est stagé, le signaler et proposer `git add` sur les fichiers pertinents (pas de `git add -A` aveugle — lister ce qui serait ajouté et demander confirmation si le diff touche plusieurs sujets non liés).

Si `$ARGUMENTS` est fourni, l'utiliser comme base du message. Sinon, générer un message conforme au format Conventional Commits utilisé dans ce projet (voir le skill `commit-message` pour le détail des types et règles).

Ne pas committer si le diff mélange plusieurs changements non liés — le signaler et proposer de scinder en plusieurs commits.
