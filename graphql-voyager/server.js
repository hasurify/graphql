const express = require('express');
const { express: voyagerMiddleware } = require('graphql-voyager/middleware');

const app = express();

app.use(
  '/voyager',
  voyagerMiddleware({
    endpointUrl: 'http://localhost:8090/v1/graphql',
    headersJS: `{"x-hasura-admin-secret": "helloworld"}`,
  })
);

app.listen(3000);
