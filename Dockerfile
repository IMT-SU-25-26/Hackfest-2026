FROM node:20 AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy project files
COPY . .

# fake DB URL
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/dummydb"

RUN pnpm prisma generate
RUN pnpm build

EXPOSE 3000