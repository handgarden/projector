#BUILD STAGE
FROM node:18 AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

COPY . .

RUN pnpm install

RUN pnpm run build

#PRODUCTION STAGE

FROM node:18

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public  ./public

RUN npm install -g pnpm

CMD ["sh", "-c", "pnpm run start"]
