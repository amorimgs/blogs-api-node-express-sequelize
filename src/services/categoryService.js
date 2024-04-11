const { Category } = require('../models');

const newCategory = async (body) => {
  if (!body.name) return { status: 400, message: { message: '"name" is required' } };

  const categoryCreated = await Category.create(body);
  console.log({ id: categoryCreated.dataValues.id, ...body });
  return { status: 201, message: { id: categoryCreated.dataValues.id, ...body } };
};

module.exports = { newCategory };