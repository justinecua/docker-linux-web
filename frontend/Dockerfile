# Build step
FROM node:20 as build

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve static files using nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
