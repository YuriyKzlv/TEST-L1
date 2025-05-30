FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=http://localhost:4000
ENV PORT=5050
RUN npm run build

EXPOSE 5050
CMD ["npm", "start"]
