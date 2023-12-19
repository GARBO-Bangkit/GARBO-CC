const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const hapiAuthJWT = require('hapi-auth-jwt2');
const {validate} = require('./functions/validate.js');

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(hapiAuthJWT);
  server.auth.strategy('jwt', 'jwt',
      {key: process.env.SECRET_KEY,
        validate,
        verifyOptions: {ignoreExpiration: true},
      });
  server.auth.default('jwt');

  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
