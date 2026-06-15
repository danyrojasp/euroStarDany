const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;
const BASE_URL = 'http://localhost:3000';

const loginUser = async () => {
  const response = await request(BASE_URL)
    .post('/api/login')
    .send({
      email: 'alice@example.com',
      password: 'password1'
    });

  expect(response.status).to.equal(200);
  expect(response.body).to.have.property('token');
  return response.body.token;
};

describe('API Path Coverage', function () {
  this.timeout(10000);

  it('should register a new user via /api/register', async () => {
    const randomEmail = `testuser+${Date.now()}@example.com`;
    const response = await request(BASE_URL)
      .post('/api/register')
      .send({
        name: 'Test User',
        email: randomEmail,
        password: 'secret123'
      });

    expect(response.status).to.equal(201);
  });

  it('should login an existing user via /api/login', async () => {
    const response = await request(BASE_URL)
      .post('/api/login')
      .send({
        email: 'alice@example.com',
        password: 'password1'
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('should checkout items with cash payment via /api/checkout', async () => {
    const token = await loginUser();
    const response = await request(BASE_URL)
      .post('/api/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send({
        paymentMethod: 'cash',
        items: [
          { productId: 1, quantity: 1 }
        ]
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('success', true);
    expect(response.body).to.have.property('paymentMethod', 'cash');
    expect(response.body).to.have.property('discount', 12.0);
    expect(response.body).to.have.property('total', 108.0);
  });

  it('should return health status via /api/healthcheck', async () => {
    const response = await request(BASE_URL)
      .get('/api/healthcheck');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status', 'ok');
    expect(response.body).to.have.property('message', 'E-commerce API is running');
  });
});
