# Stage 1: Build Angular
FROM node:20-alpine AS build
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY . .
RUN pnpm run build --configuration production

# Stage 2: NGINX
FROM nginx:alpine

# 🔥 Copiar SOLO el contenido del directorio "browser"
COPY --from=build /app/dist/xs-frontend-gestion/browser /usr/share/nginx/html

# Config SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
