---
name: skill-authoring
description: Utiliser ce skill quand l'utilisateur demande de créer, modifier ou structurer un nouveau skill Claude Code pour ce projet, afin de respecter le format et les conventions retenues ici.
---

# Créer un nouveau skill pour ce projet

## Avant de créer un skill : le test de pertinence

Un skill n'a de valeur que s'il encode une connaissance **spécifique à ce projet** que Claude ne devinerait pas seul (convention interne, workflow propre à l'équipe, format de fichier maison...).

Poser la question : *"Si je supprime ce SKILL.md, Claude ferait-il sensiblement moins bien la tâche ?"*
Si la réponse est non — parce que le contenu reste générique — ne pas créer de skill. Mettre l'info dans `docs/` si c'est de la référence, ou dans `CLAUDE.md` si c'est une règle permanente à respecter partout.

## Structure attendue

```
.claude/skills/<nom-du-skill>/
├── SKILL.md          # obligatoire
├── references/        # optionnel — doc supplémentaire chargée à la demande
├── scripts/            # optionnel — code exécutable
└── assets/              # optionnel — fichiers statiques (templates, config de base)
```

## Nomenclature

- Nom de dossier en `kebab-case`, verbe ou nom d'action concret (ex. `add-api-endpoint`, pas `feature-development`).
- Le champ `name` du frontmatter doit correspondre exactement au nom du dossier.
- Éviter les catégories larges de type "phase du cycle de vie" (ex. `bug-fixing`, `refactoring` génériques) — préférer des workflows précis et reproductibles.

## Frontmatter

```yaml
---
name: nom-du-skill
description: Phrase qui décrit CE QUE fait le skill ET QUAND l'utiliser (déclencheurs). C'est le seul élément que Claude voit avant de décider de charger le skill.
---
```

Le champ `description` est le point le plus important du fichier : c'est lui qui détermine si le skill se déclenche. Une description vague ou qui se recoupe avec un autre skill existant fait que l'un des deux ne se déclenchera jamais de façon fiable.

**Bonne description :** "Utiliser ce skill pour générer une migration de base de données Postgres suivant nos conventions Alembic. Se déclenche sur une demande d'ajout/modification de table ou colonne."

**Mauvaise description (trop vague) :** "Aide pour la base de données."

## Checklist avant de valider un nouveau skill

- [ ] Le contenu est spécifique à ce projet, pas une reformulation de bonnes pratiques génériques
- [ ] La description ne chevauche pas un skill existant
- [ ] Le nom du dossier = le champ `name`
- [ ] Le SKILL.md reste concis (idéalement sous ~300 lignes) ; le contenu volumineux va dans `references/`, chargé à la demande
- [ ] Un exemple concret est inclus dans le corps du skill
