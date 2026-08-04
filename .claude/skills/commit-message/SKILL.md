---
name: commit-message
description: Utiliser ce skill pour rédiger un message de commit Git dans ce projet. Se déclenche quand l'utilisateur demande de committer, de rédiger un message de commit, ou avant tout `git commit`.
---

# Rédaction de message de commit

Ce projet suit le format **Conventional Commits**.

## Format

```
<type>(<scope optionnel>): <description courte>

<corps optionnel>

<footer optionnel>
```

## Types autorisés

- `feat` — nouvelle fonctionnalité
- `fix` — correction de bug
- `docs` — documentation uniquement
- `style` — formatage, points-virgules manquants, etc. (aucun changement de logique)
- `refactor` — changement de code qui ne corrige ni n'ajoute de fonctionnalité
- `perf` — amélioration de performance
- `test` — ajout ou correction de tests
- `chore` — maintenance, dépendances, config
- `build` — système de build ou dépendances externes
- `ci` — configuration CI/CD

## Règles

- Description courte : impératif présent ("ajoute", pas "ajouté" ni "ajoute"), pas de majuscule initiale, pas de point final, 50 caractères max si possible.
- Le corps (optionnel) explique le **pourquoi**, pas le comment — le diff montre déjà le comment.
- Une ligne vide entre la description courte, le corps et le footer.
- Un changement cassant : ajouter `BREAKING CHANGE: <explication>` dans le footer, ou `!` après le type/scope (`feat!:`).

## Exemples

```
feat(auth): ajoute la connexion via OAuth Google

fix(api): corrige la validation du champ email vide

refactor(db): extrait la logique de pagination dans un helper partagé

feat(api)!: renomme le champ `user_id` en `userId`

BREAKING CHANGE: les clients doivent utiliser `userId` au lieu de `user_id`
```

## Ce que Claude doit faire

1. Regarder le diff / les fichiers modifiés (`git diff --staged` ou équivalent) pour déterminer le type et le scope pertinents.
2. Proposer un message conforme au format ci-dessus.
3. Si plusieurs changements non liés sont mélangés dans le même commit, le signaler et suggérer de les scinder plutôt que d'écrire un message fourre-tout.
