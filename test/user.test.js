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
  // Pregunta 5.1 b: crear con POST y verificar con GET
  test('POST /users y luego GET /users muestra el usuario creado', async () => {
    const nuevo = { name: 'Lucia Andrade', email: 'lucia.andrade@espe.edu.ec' };
    await request(app).post('/users').send(nuevo).expect(201);

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toContainEqual(expect.objectContaining(nuevo));
  });

  // Pregunta 5.1 c: flujo completo (end-to-end simulado)
  test('flujo completo: crea tres usuarios y todos aparecen en el listado', async () => {
    const antes = await request(app).get('/users');
    const nuevos = [
      { name: 'Ana Vega', email: 'ana.vega@espe.edu.ec' },
      { name: 'Pedro Mena', email: 'pedro.mena@espe.edu.ec' },
      { name: 'Sofia Rios', email: 'sofia.rios@espe.edu.ec' }
    ];

    for (const usuario of nuevos) {
      const creado = await request(app).post('/users').send(usuario);
      expect(creado.status).toBe(201);
    }

    const despues = await request(app).get('/users');
    expect(despues.body).toHaveLength(antes.body.length + 3);
    nuevos.forEach((usuario) => {
      expect(despues.body).toContainEqual(expect.objectContaining(usuario));
    });
  });
});
