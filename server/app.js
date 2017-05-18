import Hapi from 'hapi';
import inert from 'inert';

import logger from './router/logger/route.js';
import music from './router/music/route.js';
import staticFile from './router/staticFile/route.js';

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8888,
});


server.register(
  [inert, music, logger, staticFile],
  err => {
    if (err) throw err;

    server.start(() => {
      console.log(`server is running at: ${server.info.uri}`);
    });
  }
);