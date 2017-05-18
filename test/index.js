import http from 'http';
import assert from 'assert';

import '../server/app.js';

describe('Example Node Server', () => {
  it('should return 200', done => {
    http.get('http://localhost:8888', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});