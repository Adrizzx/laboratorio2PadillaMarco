const express = require('express');
const userRoutes = require('./routes/user.routes');

const app = express();

// Permite leer el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Rutas de la API de usuarios
app.use('/users', userRoutes);

// Cualquier ruta que no exista responde 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;
