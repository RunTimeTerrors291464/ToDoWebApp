# --- Stage 1: Build ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package.json và lock file trước
COPY package*.json ./

# Cài dependencies
RUN npm install --frozen-lockfile

# Copy toàn bộ code
COPY . .

# Copy file env production
# COPY .env.production ./

# Build app
RUN npm run build

# --- Stage 2: Run ---
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copy only cần thiết từ builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
