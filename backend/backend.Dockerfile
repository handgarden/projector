#BUILD STAGE
FROM node:18 AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build

# PRODUCTION STAGE
FROM node:18

WORKDIR /app

COPY --from=build /app/dist/src ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json 
COPY --from=build /app/.env  ./.env
COPY --from=build /app/migrations ./migrations
COPY --from=build /app/migration-config.ts ./migration-config.ts

CMD ["sh", "-c", "npm run migration:run && node main.js"]
