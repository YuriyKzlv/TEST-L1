FROM node:16-alpine

WORKDIR /app

COPY package.json ./
RUN npm install
RUN npm ci --omit=dev
RUN apk add --no-cache bash

COPY . .

ENV NODE_ENV=development

EXPOSE 4000

CMD ["./docker-entrypoint.sh"]


