const { Product } = require('../database/models');
// const { CustomError } = require('../errors/custom.error');

const getById = async () => {};

const getAll = async () => {
  const products = await Product.findAll();
  return products;
};

const create = async () => {};
module.exports = {
  getById,
  create,
  getAll,
};
