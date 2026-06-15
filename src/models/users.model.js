const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    passwordHash: bcrypt.hashSync('password1', 10)
  },
  {
    id: 2,
    name: 'Bob',
    email: 'bob@example.com',
    passwordHash: bcrypt.hashSync('password2', 10)
  },
  {
    id: 3,
    name: 'Charlie',
    email: 'charlie@example.com',
    passwordHash: bcrypt.hashSync('password3', 10)
  }
];

module.exports = users;
