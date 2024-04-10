const userServices = require('../services/userService');

const login = async (req, res) => {
  const result = await userServices.login(req.body);
  res.status(result.status).json(result.message);
};

module.exports = { login };