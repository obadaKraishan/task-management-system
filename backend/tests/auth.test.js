// tests/auth.test.js
const request = require('supertest');
const app = require('../server');

describe('POST /api/auth', () => {
  it('should authenticate user and return token', async () => {
    const res = await request(app)
      .post('/api/auth')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
