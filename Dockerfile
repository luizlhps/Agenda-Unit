FROM node:22.12.0-alpine as build
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build


FROM node:22.12.0-alpine
RUN addgroup -S appgrupo && adduser -S aplicacao -G appgrupo
USER aplicacao
WORKDIR /usr/app
COPY --from=build /app/src/dist/app/ ./
CMD node server/server.mjs
EXPOSE 4000
