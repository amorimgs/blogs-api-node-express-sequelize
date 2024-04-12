const postService = require('../services/postService');

const newPost = async (req, res) => {
  const userId = req.user.payload.id;
  const result = await postService.newPost({ userId, ...req.body });
  return res.status(result.status).json(result.message);
};

const getAllPosts = async (req, res) => {
  const result = await postService.getAllPosts();
  return res.status(result.status).json(result.message);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const result = await postService.getPostById(id);
  return res.status(result.status).json(result.message);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const result = await postService.updatePost(id, req.body);
  return res.status(result.status).json(result.message);
};

module.exports = { newPost, getAllPosts, getPostById, updatePost };