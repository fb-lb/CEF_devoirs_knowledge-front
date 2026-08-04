# Workflow

## Imports

Lire :
- `docs/conventions/git.md`

## Cycle de développement

1. créer une branche dédiée à l'évolution (voir nommage dans `conventions/git.md`)
2. implémenter le changement, en général par petites étapes commitées séparément et documentées précisément (voir historique Git : chaque commit décrit le fichier modifié et la raison du changement)
3. mettre à jour ou ajouter les tests unitaires concernés (`*.spec.ts`)
4. mettre à jour la documentation dans `docs/` si le changement l'impacte
5. ouvrir une Pull Request vers `main`
6. fusionner via merge commit après revue

## Livraison

- Fusion vers `main` via Pull Request (voir historique : `Merge pull request #N from fb-lb/<branche>`).
- Pas de déploiement automatique déclenché par la fusion : le déploiement (`npm run deploy`) reste une action manuelle distincte (voir `deployment.md`).

## Définition de terminé

Une évolution est considérée comme terminée lorsque :
- le code compile (`ng build`)
- les tests concernés réussissent (`ng test`)
- la documentation dans `docs/` a été mise à jour si nécessaire
- les conventions du projet sont respectées (voir `docs/conventions/`)

## Invariants

- une évolution importante commence par un plan (comprendre l'existant avant de modifier, voir `CLAUDE.md`)
- ne pas mélanger plusieurs fonctionnalités dans une même Pull Request
- corriger les tests avant de demander une revue
- conserver un historique Git clair : chaque commit doit rester compréhensible isolément (le projet a l'habitude de commits descriptifs détaillant précisément quel fichier a changé et pourquoi)
