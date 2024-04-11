const userServices = require('../services/userService');

const login = async (req, res) => {
  const result = await userServices.login(req.body);
  return res.status(result.status).json(result.message);
};

const newUser = async (req, res) => {
  const result = await userServices.newUser(req.body);
  return res.status(result.status).json(result.message);
};

const getAllUsers = async (req, res) => {
  const result = await userServices.getAllUsers();
  res.status(result.status).json(result.message);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await userServices.getUserById(id);
  res.status(result.status).json(result.message);
  return result; 
};

module.exports = { login, newUser, getAllUsers, getUserById };