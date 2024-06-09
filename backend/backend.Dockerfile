# TEST AND BUILD STAGE
FROM node:18 AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY nest-cli.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY test ./test
COPY src ./src

RUN pnpm run test
RUN pnpm run build


# PRODUCTION STAGE
FROM node:18

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/dist/ ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json 
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/tsconfig.build.json ./tsconfig.build.json

COPY .env.production  ./.env
COPY /migrations ./migrations
COPY /migration-config.ts ./migration-config.ts

CMD ["sh", "-c", "npm run migration:run && node main.js"]
