---
name: changelog-entry
description: Utiliser ce skill pour ajouter une entrée dans CHANGELOG.md après un changement notable (nouvelle fonctionnalité, correction, changement cassant). Suit le format Keep a Changelog.
---

# Entrée de changelog

Ce projet suit le format [Keep a Changelog](https://keepachangelog.com/).

## Structure

Les entrées vont sous la section `## [Unreleased]`, dans la sous-catégorie appropriée :

- `### Added` — nouvelles fonctionnalités
- `### Changed` — changements de comportement existant
- `### Deprecated` — fonctionnalités bientôt supprimées
- `### Removed` — fonctionnalités supprimées
- `### Fixed` — corrections de bugs
- `### Security` — corrections de vulnérabilités

## Règles

- Une ligne par changement, du point de vue de l'utilisateur final (pas de détails d'implémentation interne).
- Créer la sous-catégorie si elle n'existe pas encore sous `[Unreleased]`.
- Ne jamais modifier une version déjà publiée (une section `## [x.y.z] - date` existante) — seulement `[Unreleased]`.
- Ne pas dupliquer une entrée déjà présente pour le même changement.

## Exemple

```markdown
## [Unreleased]

### Added
- Ajout de l'export CSV pour les rapports mensuels

### Fixed
- Correction du calcul de TVA sur les factures avec remise
```

## Ce que Claude doit faire

1. Vérifier si `CHANGELOG.md` existe à la racine ; si non, proposer de le créer avec le format Keep a Changelog.
2. Identifier la catégorie appropriée pour le changement en cours.
3. Rédiger une ligne concise, orientée utilisateur.
4. Ne pas ajouter d'entrée pour des changements internes invisibles pour l'utilisateur (refactoring pur, tests, config CI) sauf demande explicite.
