# -------- Stage 1: Build --------
FROM node:20-slim AS builder

# 1. SETUP PNPM FIRST
# We must set the path and enable corepack BEFORE running any pnpm command
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 2. Install System Dependencies
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 3. Copy Manifest Files
# We must copy package.json BEFORE installing dependencies
COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma

# 4. Install Dependencies (With Cache)
# This will now work because pnpm is enabled and package.json exists
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm i --frozen-lockfile

# 5. Copy Source Code & Build
COPY . .

# Fake DB URL for build validation
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/dummydb"

ARG NEXT_PUBLIC_CLOUDINARY_API_KEY
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

ENV NEXT_PUBLIC_CLOUDINARY_API_KEY=$NEXT_PUBLIC_CLOUDINARY_API_KEY
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=$NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

RUN pnpm prisma generate
RUN pnpm build


# -------- Stage 2: Runtime --------
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 1. SETUP PNPM (Again for the new stage)
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 2. Set Dummy URL for Runtime Build Steps
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummydb"

RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy artifacts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

# 3. Install Runtime Tools (With Cache)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm add prisma@6.18.0 tsx dotenv @prisma/client@6.18.0 @prisma/adapter-pg pg \
    && pnpm prisma generate

EXPOSE 3000

CMD ["node" , "server.js"]