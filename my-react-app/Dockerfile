# Используем официальный Node.js образ для сборки приложения
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Используем nginx для сервировки статических файлов
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Копируем кастомный конфиг nginx (опционально)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]