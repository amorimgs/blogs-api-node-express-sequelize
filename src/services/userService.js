const { User, BlogPost, PostCategory, sequelize } = require('../models');
const helpFunctions = require('./helpers/helpFunctions');

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
  const token = helpFunctions.tokenGenerate(data);
  return { status: 200, message: { token } };
};

const newUser = async (body) => {
  const validate = helpFunctions.validateInputsNewUser(body);
  if (validate) return validate;

  const user = await User.findOne({ where: { email: body.email } });
  if (user) return { status: 409, message: { message: 'User already registered' } };
  
  const userCreated = await User.create(body);

  const token = helpFunctions.tokenGenerate({ id: userCreated.dataValues.id, ...body });
  return { status: 201, message: { token } };
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { status: 200, message: users };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) return { status: 404, message: { message: 'User does not exist' } };
  return { status: 200, message: user };
};

const deleteUser = async (id) => {
  try {
    await sequelize.transaction(async (t) => {
      const postsIds = await BlogPost.findAll({ where: { userId: id } }, { attributes: ['id'] });
      if (postsIds) {
        await Promise.all(postsIds.map(async (postId) => {
          await PostCategory.destroy({ where: { postId: postId.id } }, { transaction: t });
        }));
      }
      await BlogPost.destroy({ where: { userId: id } }, { transaction: t });
      await User.destroy({ where: { id } });
    });
    return { status: 204 };
  } catch (error) {
    return { status: 500, message: { message: 'Internal server error' } };
  }
};

module.exports = { login, newUser, getAllUsers, getUserById, deleteUser };