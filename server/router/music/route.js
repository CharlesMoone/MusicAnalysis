export default function register(server, options, next) {
  server.route([{
    method: 'GET',
    path: '/hello',
    handler: (request, reply) => {
      reply.file('./index.html');
    },
  }]);

  next();
}

register.attributes = {
  name: 'music',
  version: '0.0.1',
};