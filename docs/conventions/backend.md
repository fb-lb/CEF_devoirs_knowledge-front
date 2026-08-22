# Conventions Backend

Ces conventions concernent le dépôt backend (`knowledge-back`), séparé de ce dépôt frontend. Elles sont documentées ici pour donner le contexte nécessaire à la lecture des réponses API et à la conception des services front — ne pas les appliquer telles quelles à du code Angular.

## Contrôleurs

- valident les entrées reçues (souvent via `form.service.ts` côté backend)
- délèguent la logique métier aux services (`src/services/*.service.ts`)
- retournent une réponse au format `ApiResponse` standard (`{ success, message, data? }`)

## Services

- une responsabilité par domaine (`theme.service.ts`, `user-cursus.service.ts`, etc.)
- logique métier centralisée, y compris les cascades (achat, validation, certification, suppression — voir `docs/business-rules.md`)
- accès direct aux modèles Sequelize (pas de couche repository séparée)

## Accès aux données

- utilisation exclusive de Sequelize (ORM)
- pas de repository intermédiaire : les services appellent directement les modèles

## Gestion des erreurs

- classe unique `AppError` (status HTTP + message technique + `messageFront` destiné à l'utilisateur)
- handler d'erreur global centralisé qui uniformise le format de réponse
- aucune erreur interne (stack trace, détail technique) n'est exposée au client

## Validation

- validation manuelle (regex, contrôles de longueur) dans `form.service.ts`, pas de librairie de schéma (Joi/Zod)
- le prix facturé est toujours recalculé serveur, jamais confié au client (voir `stripe.controller.ts`)

## Authentification

- rôles stockés en JSON (`User.roles`, tableau `"user"`/`"admin"`) plutôt qu'une table `roles` séparée
- deux middlewares de garde (`privateUser`, `privateAdmin`) qui vérifient signature JWT + rôle
- token régénéré à chaque requête authentifiée (rolling token), renvoyé dans le header `Authorization` de la réponse

## Invariants

- aucune logique métier dans les contrôleurs (délégation systématique aux services)
- toutes les entrées sont validées avant traitement
- le prix et les rôles ne sont jamais fait confiance depuis le client
- les erreurs sont toujours renvoyées au format `ApiResponse` standardisé
