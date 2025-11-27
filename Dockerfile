# FROM node:20-bullseye AS base
# RUN npm install -g pnpm

# FROM base AS deps
# WORKDIR /app
# COPY package.json pnpm-lock.yaml ./
# RUN pnpm install --frozen-lockfile

# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# ARG DATABASE_URL
# ENV DATABASE_URL=$DATABASE_URL
# RUN pnpm prisma generate
# RUN pnpm build

# FROM base AS runner
# WORKDIR /app
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./
# EXPOSE 3000
# CMD ["pnpm", "start"]


FROM node:20 AS deps
WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:20 AS builder
WORKDIR /app

# Copy pnpm binary from deps stage
COPY --from=deps /usr/local/bin/pnpm /usr/local/bin/pnpm

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN pnpm prisma generate
RUN pnpm build
