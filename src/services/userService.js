const jwt = require('jsonwebtoken');
const { User } = require('../models');

const login = async (body) => {
  if (!body.email || !body.password) {
    return {
      status: 400,
      message: 'Some required fields are missing',
    };
  }
  const user = await User.findOne({ where: { email: body.email, password: body.password },
    attributes: { exclude: ['password'] } });
  console.log(user);
  if (!user) return { status: 400, message: 'Invalid fields' };
  
  const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';
  const token = jwt.sign({ data: body.email }, secret);
  return { status: 200, message: token };
};

module.exports = { login };