FROM node:22-alpine

# Install git so the sandbox can clone repos
RUN apk add --no-cache git

WORKDIR /app

# Install dependencies first (layer cache)
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY src ./src

# Run as non-root for least-privilege
RUN addgroup -S sandbox && adduser -S -G sandbox sandbox
USER sandbox

ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "src/index.js"]
