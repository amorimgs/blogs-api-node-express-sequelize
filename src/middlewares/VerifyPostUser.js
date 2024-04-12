const { BlogPost } = require('../models');

const verify = async (req, res, next) => {
  const { id } = req.user.payload;
  const userId = await BlogPost.findByPk(req.params.id);
  if (!userId) return res.status(404).json({ message: 'Post does not exist' });
  if (userId.userId === id) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized user' });
};

module.exports = { verify };