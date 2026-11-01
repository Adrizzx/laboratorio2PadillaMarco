const request = require('supertest');
const app = require('../src/app');

describe('API de usuarios /users', () => {
  test('GET /users devuelve un arreglo vacío al iniciar', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /users crea un usuario válido', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Marco Padilla', email: 'marco.padilla@espe.edu.ec' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Marco Padilla');
    expect(response.body.email).toBe('marco.padilla@espe.edu.ec');
  });

  test('POST /users sin name ni email devuelve 400', async () => {
    const response = await request(app).post('/users').send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Los campos name y email son obligatorios');
  });
});
