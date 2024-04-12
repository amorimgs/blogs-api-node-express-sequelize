const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');

const newPost = async (body) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const blogCreated = await BlogPost.create({ 
        ...body, updated: new Date() }, { transaction: t });
      await Promise.all(body.categoryIds.map(async (el) => {
        await PostCategory.create({
          postId: blogCreated.dataValues.id,
          categoryId: el,
        }, { transaction: t });
      }));
      return blogCreated;
    });
    return { status: 201, message: result };
  } catch (err) {
    console.log(err.message);
    return { status: 400, message: { message: 'one or more "categoryIds" not found' } };
  }
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    { model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return { status: 200, message: posts };
};

module.exports = { newPost, getAllPosts };