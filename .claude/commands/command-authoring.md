---
description: Utiliser cette commande quand l'utilisateur demande de créer une nouvelle commande personnalisée pour ce projet, afin de respecter le format et les conventions retenues ici.
---

# Créer une nouvelle commande pour ce projet

## Avant de créer une commande : le bon outil pour le bon besoin

Une commande est le bon choix pour un **workflow répétitif et déclenché explicitement** par l'utilisateur (`/nom`) — pas pour de la connaissance que Claude doit appliquer automatiquement quand le contexte s'y prête (→ skill) ni pour une tâche qui bénéficie d'un contexte isolé (→ agent). Voir `agent-authoring` et `skill-authoring` pour ces deux autres cas.

Test de pertinence : *est-ce une action que l'utilisateur tape volontairement, toujours de la même façon ?* Si oui, commande. Si c'est plutôt "Claude devrait y penser tout seul", c'est un skill.

## Structure attendue

Une commande est un **fichier Markdown unique** :

```
.claude/commands/<nom-de-la-commande>.md
```

Le nom du fichier devient le nom de la commande : `commit.md` → `/commit`. Un sous-dossier crée un espace de noms : `.claude/commands/frontend/component.md` → `/frontend:component`.

## Frontmatter

| Champ | Requis | Rôle |
|---|---|---|
| `description` | Recommandé | Affiché dans `/help` ; sert aussi de déclencheur si Claude peut invoquer la commande lui-même |
| `argument-hint` | Non | Indice affiché à l'autocomplétion, ex. `[message]` |
| `allowed-tools` | Non | Restreint/pré-autorise les outils, ex. `Bash(git add:*), Bash(git commit:*)` |
| `model` | Non | Modèle spécifique pour cette commande, ex. `haiku` pour une tâche simple et rapide |
| `disable-model-invocation` | Non | `true` empêche Claude de déclencher la commande de lui-même — réserver aux commandes à effet de bord (écriture, commit, déploiement) que seul l'utilisateur doit déclencher explicitement |

```yaml
---
description: Brève description affichée dans /help
argument-hint: [arg1] [arg2]
allowed-tools: Bash(git:*)
disable-model-invocation: false
---
```

## Corps du fichier

- `$ARGUMENTS` capture tout ce qui suit le nom de la commande en une seule chaîne.
- `$1`, `$2`, ... capturent les arguments positionnels séparés par des espaces.
- `@chemin/vers/fichier` insère le contenu d'un fichier dans le prompt.
- `` !`commande bash` `` exécute la commande et insère sa sortie dans le prompt (nécessite que l'outil `Bash` correspondant soit dans `allowed-tools`).

## Règle importante : `disable-model-invocation`

Si la commande a un effet de bord (commit, déploiement, écriture de fichier), mettre `disable-model-invocation: true`. Sans ça, Claude peut décider de l'invoquer lui-même en se basant sur la `description`, ce qui est dangereux pour une action irréversible. Les commandes en lecture seule (`/review`, `/prime`) n'ont pas besoin de cette restriction.

## Checklist avant de valider une nouvelle commande

- [ ] C'est bien un déclenchement explicite et répétitif, pas de la connaissance contextuelle (→ sinon, skill)
- [ ] `allowed-tools` restreint aux outils réellement nécessaires, avec des patterns précis (`Bash(git commit:*)` plutôt que `Bash` seul)
- [ ] `disable-model-invocation: true` si la commande a un effet de bord
- [ ] `argument-hint` renseigné si la commande attend des arguments
- [ ] Le corps du prompt précise le format de sortie attendu, pas juste l'action à faire
