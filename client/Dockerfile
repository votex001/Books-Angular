FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build -- --output-path=dist/frontend --configuration=production

FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 4200
CMD ["nginx","-g","daemon off;"]