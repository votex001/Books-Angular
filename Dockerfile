# Stage 1: Build Angular

FROM node:20-alpine AS build-client
WORKDIR /client
COPY client/package*.json ./
RUN npm ci
COPY client/ .
RUN npm run build

# Stage 2: Prepare Node.js

FROM node:20-alpine AS build-server
WORKDIR /server
COPY package*.json ./
RUN apk add --no-cache python3 make g++ \
    && npm ci --only=production \
    && apk del python3 make g++
COPY . .

# Stage 3: Copy all and init

FROM node:20-alpine
WORKDIR /app

#client files
COPY --from=build-client /public /app/public

#server files
COPY --from=build-server /server /app

EXPOSE 2027
ENV PORT=2027
CMD ["npm", "start"]