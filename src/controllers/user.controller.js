// Almacenamiento en memoria: el arreglo vive mientras el servidor esté encendido
const users = [];
let nextId = 1;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET /users: devuelve todos los usuarios guardados
const getAllUsers = (req, res) => {
  res.status(200).json(users);
};

// POST /users: valida los datos y crea un usuario nuevo
const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Los campos name y email son obligatorios' });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'El formato del email no es válido' });
  }

  const duplicated = users.some((user) => user.email === email.toLowerCase());
  if (duplicated) {
    return res.status(409).json({ error: 'Ya existe un usuario con ese email' });
  }

  const newUser = { id: nextId++, name: name.trim(), email: email.toLowerCase() };
  users.push(newUser);
  return res.status(201).json(newUser);
};

module.exports = { getAllUsers, createUser };
