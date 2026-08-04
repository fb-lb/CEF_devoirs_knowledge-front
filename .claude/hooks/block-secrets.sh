#!/usr/bin/env bash
# Hook PreToolUse — bloque Read/Edit/Write sur des fichiers sensibles,
# même si .claudeignore ne les exclut que du chargement automatique.
# Contrairement à .claudeignore, ce hook empêche réellement l'accès,
# y compris sur demande explicite.

set -euo pipefail

input="$(cat)"
file_path="$(echo "$input" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | sed -E 's/.*"([^"]*)"$/\1/')"

if [ -z "$file_path" ]; then
  exit 0
fi

# Motifs interdits — adapter à votre projet
patterns=(
  '\.env($|\.[^.]+$)'
  '(^|/)secrets?/'
  '(^|/)credentials/'
  '\.pem$'
  '\.key$'
  '\.crt$'
)

for pattern in "${patterns[@]}"; do
  if echo "$file_path" | grep -qE "$pattern"; then
    echo "Accès bloqué : '$file_path' correspond à un motif de fichier sensible ($pattern). Si l'accès est réellement nécessaire, demandez à l'utilisateur de partager le contenu manuellement." >&2
    exit 2
  fi
done

exit 0
