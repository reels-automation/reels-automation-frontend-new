# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy and install dependencies
COPY package.json .
COPY package-lock.json . 
RUN npm install

# Copy the source and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

# Add custom nginx config to support React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
