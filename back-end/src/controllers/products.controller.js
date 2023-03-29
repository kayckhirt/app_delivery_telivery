const productsService = require('../services/products.service');

// const { CustomError } = require('../errors/custom.error');

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const products = await productsService.getAll();
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, price, urlImage } = req.body;
    const products = await productsService.create({ name, price, urlImage });
    return res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getById,
  getAll,
  create,
};
