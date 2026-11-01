const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  process.stdout.write(`Servidor ejecutándose en http://localhost:${PORT}\n`);
});
