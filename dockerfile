FROM node:alpine AS builder

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run generate

RUN npm run build

FROM node:alpine AS runtime

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/package.json .

COPY --from=builder /app/package-lock.json .

COPY --from=builder /app/prisma/ ./prisma/

RUN npm ci

RUN npm run generate

COPY --from=builder /app/dist/ ./dist/

CMD [ "npm", "run", "start:prod" ]
