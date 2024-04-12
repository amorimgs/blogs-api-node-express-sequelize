const jwt = require('jsonwebtoken');

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

module.exports = { tokenGenerate, validateInputsNewUser };