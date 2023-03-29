const { Product } = require('../database/models');
const { CustomError } = require('../errors/custom.error');

const getById = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw CustomError('404', 'Product not found!');
  return product;
};

const getAll = async () => {
  const products = await Product.findAll();
  return products;
};

const create = async ({ name, price, urlImage }) => {
  const product = await Product.create({ name, price, urlImage });
  if (!product) throw CustomError('404', 'Product not found!');
  
  return product;
};

module.exports = {
  getById,
  create,
  getAll,
};
