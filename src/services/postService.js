const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');

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
    return { status: 400, message: { message: 'one or more "categoryIds" not found' } };
  }
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll(configFind);
  return { status: 200, message: posts };
};

const getPostById = async (id) => {
  const verify = await BlogPost.findByPk(id);
  if (!verify) return { status: 404, message: { message: 'Post does not exist' } };
  const post = await BlogPost.findByPk(id, configFind);
  return { status: 200, message: post };
};

const updatePost = async (id, body) => {
  if (!body.title || !body.content) {
    return { status: 400, message: { message: 'Some required fields are missing' } };
  }
  await BlogPost.update(body, { where: { id } });
  const post = await BlogPost.findByPk(id, configFind);
  return { status: 200, message: post };
};

module.exports = { newPost, getAllPosts, getPostById, updatePost };