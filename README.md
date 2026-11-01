# laboratorio2PadillaMarco

Laboratorio N°2 de Pruebas de Software (ESPE): verificación y validación de una API REST de usuarios hecha con Node.js y Express. La verificación se hace con ESLint y la validación con pruebas unitarias y de flujo completo en Jest y Supertest.

**Autor:** Marco Adrian Padilla Triviño
**Docente:** Ing. Mauricio Campaña

## Requisitos

- Node.js 20 o superior
- npm

## Instalación y uso

```bash
npm install          # instala las dependencias
npm start            # levanta la API en http://localhost:3000
npm test             # ejecuta las pruebas
npm run test:coverage  # pruebas con reporte de cobertura (coverage/lcov-report/index.html)
npm run lint         # revisa el código de src con ESLint
npm run lint:fix     # corrige lo que ESLint puede arreglar solo
```

## Endpoints

| Método | Ruta | Descripción | Respuestas |
|---|---|---|---|
| GET | `/users` | Lista los usuarios guardados en memoria | 200 |
| POST | `/users` | Crea un usuario `{ name, email }` | 201, 400, 409 |

Cualquier otra ruta responde 404.

## Pruebas

`test/user.test.js` tiene 8 pruebas: listado inicial, creación válida, datos incompletos, creación y verificación con GET, flujo completo con tres usuarios, email con formato inválido, email repetido y ruta inexistente. La cobertura final es 100 % en sentencias, ramas, funciones y líneas.

## Estructura

```
src/
  app.js                      # aplicación Express (se exporta para las pruebas)
  server.js                   # levanta el servidor
  controllers/user.controller.js
  routes/user.routes.js
test/
  user.test.js
eslint.config.js
requests.http                 # peticiones para la extensión REST Client
```
