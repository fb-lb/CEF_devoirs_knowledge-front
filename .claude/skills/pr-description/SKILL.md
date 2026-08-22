---
name: pr-description
description: Utiliser ce skill pour rédiger la description d'une pull request / merge request avant de l'ouvrir. Se déclenche quand l'utilisateur demande de préparer, rédiger ou générer une description de PR.
---

# Description de pull request

## Template

```markdown
## Contexte

[Pourquoi ce changement ? Quel problème résout-il ? Lien vers un ticket/issue si applicable]

## Changements

- [Changement 1]
- [Changement 2]

## Comment tester

[Étapes pour vérifier manuellement le changement, ou tests automatisés concernés]

## Captures d'écran

[Si changement visuel — avant/après]

## Checklist

- [ ] Tests ajoutés ou mis à jour
- [ ] Documentation mise à jour si nécessaire
- [ ] Pas de changement cassant non documenté
```

## Ce que Claude doit faire

1. Analyser les commits et le diff de la branche par rapport à la branche cible (généralement `main`).
2. Regrouper les changements par intention (pas juste lister les fichiers modifiés).
3. Remplir la section "Comment tester" avec des étapes concrètes et reproductibles, pas des généralités.
4. Omettre la section "Captures d'écran" si aucun changement visuel n'est concerné.
5. Rester factuel — décrire ce qui a changé, pas vendre le changement.
