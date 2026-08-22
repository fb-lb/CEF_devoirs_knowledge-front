# Conventions communes

## Langue

- code (noms de variables, fonctions, classes, commentaires) : anglais
- documentation (`docs/`, `CLAUDE.md`) : français
- messages affichés à l'utilisateur final (UI, erreurs) : français
- messages de commit Git : anglais (voir `docs/conventions/git.md`)

## Nommage

- noms explicites, pas d'abréviation ambiguë (`retrieveAllThemes` plutôt que `getThms`)
- fichiers en kebab-case, alignés sur le sélecteur/la classe qu'ils contiennent
- dossiers organisés par feature/domaine (`back-office-purchases/`, `user-courses/`) plutôt que par type technique générique

## Organisation des fichiers

- un composant = un dossier avec `.ts`/`.html`/`.css`/`.spec.ts`
- les interfaces de données API sont centralisées dans un seul fichier (`api-response.model.ts`) plutôt que dispersées par feature
- éviter les fichiers trop volumineux : `back-office-contents.ts` (~980 lignes) est le point le plus dense du projet, à surveiller lors de futures évolutions plutôt qu'à imiter

## Commentaires et documentation du code

- commenter le pourquoi plutôt que le quoi (ex. le commentaire récurrent `// add external service like Sentry to save the error` explique une limite connue, pas un mécanisme évident)
- JSDoc utilisé sur certaines méthodes de service pour la génération TypeDoc (`npm run docs`)
- éviter les commentaires redondants avec un nom de variable/fonction déjà explicite

## Formatage

- indentation et style suivant la configuration Angular CLI par défaut (`.editorconfig` présent à la racine)
- encodage UTF-8, fins de ligne gérées par `.editorconfig`

## Gestion des dates et formats

- pas de convention de format de date dédiée identifiée dans le code actuel (peu d'affichage de dates dans l'UI à ce jour) — à définir explicitement si une fonctionnalité l'exige.

## Principes généraux

- privilégier la simplicité : pas de state manager externe, pas de couche repository ajoutée sans besoin identifié
- éviter la duplication : composants réutilisables (`WarningModal`, `StripePayment`) plutôt que dupliqués par feature
- préférer des solutions explicites : services organisés par domaine métier clair plutôt que génériques
- ne pas introduire de complexité sans besoin : suivre l'existant (standalone components, RxJS natif) avant d'ajouter une nouvelle dépendance
