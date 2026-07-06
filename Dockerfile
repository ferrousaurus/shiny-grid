# syntax=docker/dockerfile:1
FROM denoland/deno:alpine-2.9.1 AS base

# ---- deps ----
FROM base AS deps
WORKDIR /app
COPY deno.json deno.lock package.json ./
COPY prisma ./prisma
# Install npm deps (nodeModulesDir auto) and generate the Prisma client so
# the generated `.prisma/client` is present for both build and runtime.
RUN deno install --frozen 2>/dev/null || deno install
RUN deno run --allow-all npm:prisma generate

# ---- build ----
FROM base AS builder
WORKDIR /app
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build the Vite/Nitro bundle (.output/). VITE_* client env is baked in here.
RUN deno task build

# ---- runtime ----
FROM base AS runner
WORKDIR /app
ENV DENO_DIR=/app/.deno

# The Nitro deno-server preset externalizes node deps (e.g. @prisma/client),
# so the runtime needs the node_modules tree (incl. the generated Prisma
# client) resolvable from the .output bundle via Deno's upward node_modules walk.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public
COPY --from=builder /app/deno.json ./deno.json
COPY --from=builder /app/deno.lock ./deno.lock
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

# Apply migrations then start the Nitro server (Deno preset).
CMD ["sh", "-c", "deno run --allow-all npm:prisma migrate deploy && deno run --allow-all .output/server/index.mjs"]
