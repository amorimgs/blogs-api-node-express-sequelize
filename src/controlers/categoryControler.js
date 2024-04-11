const categoryService = require('../services/categoryService');

const newCategory = async (req, res) => {
  const result = await categoryService.newCategory(req.body);
  return res.status(result.status).json(result.message);
};

const getAllCategories = async (req, res) => {
  const result = await categoryService.getAllCategories();
  return res.status(result.status).json(result.message);
};

module.exports = { newCategory, getAllCategories };