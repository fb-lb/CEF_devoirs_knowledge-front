#!/usr/bin/env bash
# Hook PreToolUse — bloque des commandes Bash à haut risque avant exécution.
# Complète (ne remplace pas) permissions.deny dans settings.json : ce hook
# s'exécute même en mode --dangerously-skip-permissions, contrairement aux
# règles de permissions classiques.

set -euo pipefail

input="$(cat)"
command="$(echo "$input" | grep -o '"command"[[:space:]]*:[[:space:]]*"[^"]*"' | sed -E 's/.*"([^"]*)"$/\1/')"

if [ -z "$command" ]; then
  exit 0
fi

# Motifs interdits — adapter à votre projet
patterns=(
  'rm[[:space:]]+-rf[[:space:]]+/($|[^a-zA-Z0-9])'
  'rm[[:space:]]+-rf[[:space:]]+\*'
  'git[[:space:]]+push[[:space:]]+.*--force'
  'git[[:space:]]+push[[:space:]]+.*-f([[:space:]]|$)'
  'git[[:space:]]+reset[[:space:]]+--hard'
  'curl[[:space:]].*\|[[:space:]]*sh'
  'wget[[:space:]].*\|[[:space:]]*sh'
  ':\(\)\{.*\};:'
)

for pattern in "${patterns[@]}"; do
  if echo "$command" | grep -qE "$pattern"; then
    echo "Commande bloquée : '$command' correspond à un motif à risque ($pattern). Si c'est réellement voulu, l'utilisateur doit l'exécuter lui-même manuellement." >&2
    exit 2
  fi
done

exit 0
