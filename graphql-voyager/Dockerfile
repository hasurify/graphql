FROM node:16-alpine

WORKDIR /home/node/app

COPY graphql-voyager/server.js /home/node/app
COPY graphql-voyager/package.json graphql-voyager/yarn.lock /home/node/app
RUN yarn

CMD ["yarn", "start"]