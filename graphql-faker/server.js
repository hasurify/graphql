const { exec } = require('child_process');

const runMockedServer = () => {
  exec('graphql-faker schema.graphql', error => {
    if (error) {
      console.error(error);
    }
  });
};

runMockedServer();
