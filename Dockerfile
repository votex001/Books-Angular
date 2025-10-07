FROM node:20-alpine


WORKDIR /app
COPY . .

RUN npm ci && cd client && npm ci && npm run build

EXPOSE 2027
CMD [ "npm", "start" ]