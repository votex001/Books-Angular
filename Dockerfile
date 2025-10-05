# Prepare Node.js

FROM node:20-alpine
WORKDIR /server
COPY package*.json ./
RUN npm ci --only=production
COPY . .


EXPOSE 2027
ENV PORT=2027
CMD ["npm", "start"]