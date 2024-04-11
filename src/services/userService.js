const jwt = require('jsonwebtoken');
const { User } = require('../models');

const login = async (body) => {
  if (!body.email || !body.password) {
    return {
      status: 400,
      message: { message: 'Some required fields are missing' },
    };
  }
  const data = await User.findOne({ where: { email: body.email, password: body.password },
    attributes: { exclude: ['password'] } });
  if (!data) return { status: 400, message: { message: 'Invalid fields' } };
  const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';
  const token = jwt.sign({ data }, secret);
  return { status: 200, message: { token } };
};

module.exports = { login };