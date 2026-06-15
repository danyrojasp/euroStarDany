const authService = require('../services/auth.service');

exports.register = (req, res) => {
  const result = authService.registerUser(req.body);
  if (!result.success) {
    return res.status(400).json({ message: result.message });
  }
  return res.status(201).json({ message: 'User registered successfully', user: result.user });
};

exports.login = (req, res) => {
  const result = authService.loginUser(req.body);
  if (!result.success) {
    return res.status(401).json({ message: result.message });
  }
  return res.status(200).json({ token: result.token });
};
