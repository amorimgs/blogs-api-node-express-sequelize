const jwt = require('jsonwebtoken');
const { User } = require('../models');

const tokenGenerate = (payload) => {
  const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';
  const token = jwt.sign({ payload }, secret);
  return token;
};
const validateInputsNewUser = (data) => {
  const { displayName, email, password } = data;
  if (displayName.length < 8) { 
    const message = '"displayName" length must be at least 8 characters long';
    return { status: 400, message: { message } };
  }
  const regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
  if (!regex.test(email)) {
    const message = '"email" must be a valid email';
    return { status: 400, message: { message } };
  }
  if (password.length < 6) {
    const message = '"password" length must be at least 6 characters long';
    return { status: 400, message: { message } };
  }
};

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
  const token = tokenGenerate(data);
  return { status: 200, message: { token } };
};

const newUser = async (body) => {
  const validate = validateInputsNewUser(body);
  if (validate) return validate;

  const user = await User.findOne({ where: { email: body.email } });
  if (user) return { status: 409, message: { message: 'User already registered' } };
  
  const userCreated = await User.create(body);

  const token = tokenGenerate({ id: userCreated.dataValues.id, ...body });
  return { status: 201, message: { token } };
};

module.exports = { login, newUser };