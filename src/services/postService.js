const { BlogPost, PostCategory, sequelize } = require('../models');

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

module.exports = { newPost };