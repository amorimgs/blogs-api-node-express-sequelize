const { BlogPost, PostCategory, sequelize } = require('../models');
const { configFind } = require('../utils/configFind');

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
const deletePost = async (id) => {
  await PostCategory.destroy({ where: { postId: id } });
  await BlogPost.destroy({ where: { id } });
  return { status: 204 };
};
const searchPost = async (q) => {
  if (q === '') return { status: 200, message: await BlogPost.findAll(configFind) };
  const resultm = await BlogPost
    .findAll({ where: sequelize.literal(`title LIKE '%${q}%'`), ...configFind });
  if (resultm.length === 0) {
    const resultC = await BlogPost
      .findAll({ where: sequelize.literal(`content LIKE '%${q}%'`), ...configFind });
    return { status: 200, message: resultC };
  }
  return { status: 200, message: resultm };
};

module.exports = { newPost, getAllPosts, getPostById, updatePost, deletePost, searchPost };