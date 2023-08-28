FROM node:16-alpine

WORKDIR /home/node/app

COPY graphql-faker/server.js /home/node/app
COPY graphql-faker/package.json graphql-faker/yarn.lock /home/node/app
RUN yarn

CMD ["yarn", "start"]