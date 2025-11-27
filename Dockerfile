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

FROM node:20 AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy project files
COPY . .

# fake DB URL just for prisma generate
ENV DATABASE_URL="file:./dev.db"

RUN pnpm prisma generate
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
