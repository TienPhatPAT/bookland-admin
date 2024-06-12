if git describe --exact-match HEAD~1 >/dev/null 2>&1; then
  echo "last commit has tag"
else
  echo "You cannot merge to main without a tag"
  exit 1
fi