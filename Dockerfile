FROM node:18-alpine AS build
WORKDIR /app

COPY package.json .
COPY package-lock.json . 
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY generate-config.sh /docker-entrypoint.d/99-generate-config.sh
RUN chmod +x /docker-entrypoint.d/99-generate-config.sh

EXPOSE 80
