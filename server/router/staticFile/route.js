export default function register(server, options, next) {
  server.route([{
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.file('./index.html');
    },
  }, {
    method: 'GET',
    path: '/dist/{filename*}',
    handler: (request, reply) => {
      reply.file(`dist/${request.params.filename}`);
    },
  }, {
    method: 'GET',
    path: '/resources/{filename}',
    handler: (request, reply) => {
      reply.file(`resources/${request.params.filename}`);
    },
  }]);

  next();
}

register.attributes = {
  name: 'staticFile',
  version: '0.1.0',
};