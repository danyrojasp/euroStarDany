const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/users.model');

const JWT_SECRET = 'your-secure-jwt-secret';

exports.registerUser = ({ name, email, password }) => {
  if (!name || !email || !password) {
    return { success: false, message: 'Name, email, and password are required.' };
  }
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return { success: false, message: 'Email is already registered.' };
  }
  const newUser = {
    id: users.length + 1,
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 10)
  };
  users.push(newUser);
  return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } };
};

exports.loginUser = ({ email, password }) => {
  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' };
  }
  const user = users.find((candidate) => candidate.email === email);
  if (!user) {
    return { success: false, message: 'Invalid email or password.' };
  }
  const validPassword = bcrypt.compareSync(password, user.passwordHash);
  if (!validPassword) {
    return { success: false, message: 'Invalid email or password.' };
  }
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
  return { success: true, token };
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
