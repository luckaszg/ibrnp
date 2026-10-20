#!/usr/bin/env bash
# Builds the website image and (re)starts the container.
#
#   ./start.sh                           # uses SITE_URL from website/.env
#   ./start.sh https://www.ibrnp.com
#   PORT=8080 ./start.sh                 # publish on another port (default 80)
#
# Values read from website/.env (optional): SITE_URL, PUBLIC_CONTACT_ENDPOINT, PUBLIC_CONTACT_KEY.
set -euo pipefail

cd "$(dirname "$0")/website"

IMAGE=ibrnp-web
CONTAINER=ibrnp-web
PORT="${PORT:-80}"

# Load .env without overriding variables already set in the environment.
if [[ -f .env ]]; then
  while IFS='=' read -r key value; do
    [[ -z "$key" || "$key" == \#* ]] && continue
    [[ -z "${!key:-}" ]] && export "$key=$value"
  done < .env
fi

SITE_URL="${1:-${SITE_URL:-}}"
if [[ -z "$SITE_URL" ]]; then
  echo "Missing domain. Usage: ./start.sh https://www.ibrnp.com (or set SITE_URL in website/.env)" >&2
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "Cannot use Docker. Is Docker running, and is your user in the 'docker' group?" >&2
  exit 1
fi

echo "==> Building the image for $SITE_URL"
docker build -t "$IMAGE" \
  --build-arg SITE_URL="$SITE_URL" \
  --build-arg PUBLIC_CONTACT_ENDPOINT="${PUBLIC_CONTACT_ENDPOINT:-}" \
  --build-arg PUBLIC_CONTACT_KEY="${PUBLIC_CONTACT_KEY:-}" \
  .

echo "==> Replacing the container"
docker rm -f "$CONTAINER" >/dev/null 2>&1 || true
docker run -d --name "$CONTAINER" --restart unless-stopped -p "$PORT:80" "$IMAGE" >/dev/null

echo "==> Checking that the site responds"
for _ in $(seq 1 20); do
  if curl -fsS -o /dev/null "http://localhost:$PORT/"; then
    echo "Done: the site is running at http://localhost:$PORT/ ($SITE_URL)"
    docker image prune -f >/dev/null
    exit 0
  fi
  sleep 1
done

echo "The container is not responding. Last log lines:" >&2
docker logs --tail 30 "$CONTAINER" >&2
exit 1
