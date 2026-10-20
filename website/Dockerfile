# Builds the static site and serves it with nginx.
#   docker build -t ibrnp-web --build-arg SITE_URL=https://www.ibrnp.com .
#   docker run -d -p 80:80 --restart unless-stopped --name ibrnp-web ibrnp-web

# ---- Build ----
FROM node:24.22.0-bookworm-slim AS build
WORKDIR /app

# Public values baked into the static files at build time (see .env.example).
ARG SITE_URL=https://www.ibrnp.com
ARG PUBLIC_CONTACT_ENDPOINT=
ARG PUBLIC_CONTACT_KEY=
ENV SITE_URL=$SITE_URL \
    PUBLIC_CONTACT_ENDPOINT=$PUBLIC_CONTACT_ENDPOINT \
    PUBLIC_CONTACT_KEY=$PUBLIC_CONTACT_KEY \
    ASTRO_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# ---- Serve ----
FROM nginx:1.28.3-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
