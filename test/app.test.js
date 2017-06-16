const request = require('supertest')
const app = require('../bin/www')

describe('GET /', () => {
  it('return 404 when /', (done) => {
    request(app)
      .get('/')
      .expect(404, done)
  })
})
