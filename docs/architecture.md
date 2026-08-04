# Architecture

## Vue d'ensemble

Le projet est une application front-end qui communique avec avec un back-end Express en API REST.  
Le service Stripe est utilisé pour valider les paiements.  
Fontawesome est utilisé pour les icônes.

## Objectifs d'architecture

Objectifs : bonne UI/UX, maintenabilité, évolutivité, performances, sécurité.

## Architecture retenue

Architecture modulaire et basée sur l'injection de dépendances.

## Découpage du projet


## Communication

Cette application communique avec une back-end qui communique lui-même avec une base de données.  
Les erreurs sont au format décrit dans `src\app\core\errors\AppError.ts`

## Dépendances autorisées

Dépendances autorisées :
- Frontend → Backend
- Backend → Couche d'accès aux données → Base de données

Dépendance interdite :
- Frontend → Database

## Gestion de la configuration

En développement, le projet est 'dev' et en production le projet est 'prod'

## Invariants d'architecture

- chaque partie du système possède une responsabilité clairement définie
- la logique métier appartient au backend
- le frontend ne contient pas de logique métier serveur
- les composants ne doivent pas contourner les interfaces prévues
- les dépendances doivent respecter le sens défini par l'architecture

## Performances

Le projet est de faible volumétrie (plateforme d'étude) : pas d'objectif de montée en charge formalisé. Points de vigilance identifiés :
- pas de lazy loading des routes actuellement (chargement eager, voir `frontend.md`) ;
- pas de pagination sur les listes du back-office (filtrage côté client) ;
- pas de mise en cache HTTP explicite entre les services (`CoursesService`/`UserCourses` rechargent via `retrieveAll*`/`syncData`).

Ces points sont à réévaluer si le volume de contenu ou d'utilisateurs augmente significativement (voir `database.md` et `frontend.md`).

## Évolutions prévues

Évolutions identifiées comme non traitées à ce jour, susceptibles d'impacter l'architecture globale si elles sont priorisées :
- ajout d'un webhook Stripe côté backend pour fiabiliser la confirmation d'achat (actuellement déclenchée côté client, voir `business-rules.md` et `decisions.md`) ;
- mise en place d'un pipeline CI/CD automatisé (actuellement déploiement manuel, voir `deployment.md`) ;
- centralisation de la gestion des erreurs frontend (actuellement dupliquée par composant, voir `frontend.md`).

Les choix déjà validés sont détaillés dans `decisions.md`.