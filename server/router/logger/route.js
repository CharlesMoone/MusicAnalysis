import Good from 'good';


function logger() {
  return {
    register: Good,
    options: {
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            response: '*',
            log: '*',
          }],
        }, {
          module: 'good-console',
        }, 'stdout'],
      },
    },
  };
}

export default logger();