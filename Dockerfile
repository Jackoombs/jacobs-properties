# Two ways this gets used — see docker-compose.yml (dev) and
# docker-compose.prod.yml (prod):
#
# - Dev: docker-compose.yml stops at the "deps" stage and bind-mounts source,
#   running `astro dev` with hot reload — nothing below "deps" is built.
# - Prod: full multi-stage build. Output is "static" (output: "static" in
#   astro.config.mjs), so the runtime image is just nginx serving pre-rendered
#   HTML — nothing Astro- or Node-specific runs in production.
#
# For the prod path, the property list is fetched at BUILD time
# (src/content.config.ts), so PUBLIC_SERVER_URL must point to a reachable API
# when this image is built — not just at container runtime. Pass it with
# --build-arg, e.g.:
#   docker build --build-arg PUBLIC_SERVER_URL=https://api.example.com/ \
#     --build-arg PUBLIC_GOOGLE_MAPS_KEY=... -t jacobs-properties-web .

FROM oven/bun:1-slim AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1-slim AS build
WORKDIR /app

ARG PUBLIC_SERVER_URL
ARG PUBLIC_GOOGLE_MAPS_KEY
ARG PUBLIC_CMS_URL
ENV PUBLIC_SERVER_URL=${PUBLIC_SERVER_URL}
ENV PUBLIC_GOOGLE_MAPS_KEY=${PUBLIC_GOOGLE_MAPS_KEY}
ENV PUBLIC_CMS_URL=${PUBLIC_CMS_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM nginxinc/nginx-unprivileged:1-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ > /dev/null || exit 1
