const { User, Category } = require('../models');

const configFind = {
  include: [{
    model: User,
    as: 'user',
    attributes: { exclude: ['password'] },
  },
  { model: Category,
    as: 'categories',
    through: { attributes: [] },
  }],
};

module.exports = { configFind };