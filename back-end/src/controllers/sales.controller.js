const salesService = require('../services/sales.service');

const { CustomError } = require('../errors/custom.error');

const getAll = async (_req, res, next) => {
  try {
    const result = await salesService.getAll();
    if (!result) throw CustomError('404', 'notFound');
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesService.getById(id);
    if (!result) throw CustomError('404', 'notFound');
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getByUserId = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const result = await salesService.getByUserId(userId);
    if (!result) throw CustomError('404', 'notFound');
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const createSaleAndSaleProduct = async (req, res, next) => {
  try {
    const result = await salesService.createSaleAndSaleProduct(req.body);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  getByUserId,
  createSaleAndSaleProduct,
};
