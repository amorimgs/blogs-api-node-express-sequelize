const postService = require('../services/postService');

const newPost = async (req, res) => {
  const userId = req.user.payload.id;
  const result = await postService.newPost({ userId, ...req.body });
  return res.status(result.status).json(result.message);
};

module.exports = { newPost };