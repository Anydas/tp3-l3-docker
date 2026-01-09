FROM node:18.20.7-alpine

LABEL num_TP=3
LABEL exercice=2
LABEL version=0.1

ENV NODE_ENV=production

WORKDIR /app

COPY . /app

RUN npm install --save sequelize sequelize-cli mysql2
RUN npm install

EXPOSE 3000

VOLUME /app

ENTRYPOINT ["npm","start"]