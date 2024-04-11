const userServices = require('../services/userService');

const login = async (req, res) => {
  const result = await userServices.login(req.body);
  return res.status(result.status).json(result.message);
};

const newUser = async (req, res) => {
  const result = await userServices.newUser(req.body);
  return res.status(result.status).json(result.message);
};

module.exports = { login, newUser };