#!/usr/bin/env bash
# Hook PostToolUse — formate automatiquement un fichier après Edit/Write,
# pour ne plus dépendre de la mémoire de Claude sur "formater après édition".
# À ADAPTER : ce script essaie de détecter l'outil de formatage du projet,
# mais chaque stack a ses propres commandes — remplacez le bloc case ci-dessous
# par la commande réelle de votre projet.

set -uo pipefail  # pas de -e : un échec de lint ne doit pas casser le hook

input="$(cat)"
file_path="$(echo "$input" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | sed -E 's/.*"([^"]*)"$/\1/')"

if [ -z "$file_path" ] || [ ! -f "$file_path" ]; then
  exit 0
fi

ext="${file_path##*.}"

case "$ext" in
  ts|tsx|js|jsx|json|css|md)
    if [ -f package.json ] && command -v npx >/dev/null 2>&1; then
      npx --no-install prettier --write "$file_path" 2>/dev/null || true
    fi
    ;;
  py)
    if command -v ruff >/dev/null 2>&1; then
      ruff format "$file_path" 2>/dev/null || true
    fi
    ;;
  go)
    if command -v gofmt >/dev/null 2>&1; then
      gofmt -w "$file_path" 2>/dev/null || true
    fi
    ;;
  *)
    exit 0
    ;;
esac

exit 0
