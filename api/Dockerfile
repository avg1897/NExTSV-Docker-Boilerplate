# develop stage
FROM node:lts-alpine as build-stage
WORKDIR /app/server
COPY package*.json ./
RUN npm install
EXPOSE 5000
CMD npm run dev

#production stage
FROM node:lts-alpine as production-stage
WORKDIR /app/server
COPY package*.json ./
RUN npm install
EXPOSE 5000

CMD ["npm", "start"]