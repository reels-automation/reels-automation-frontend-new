FROM node:18-alpine AS build
WORKDIR /app

COPY package.json .
COPY package-lock.json . 
RUN npm install

COPY .env.deploy .env
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80
