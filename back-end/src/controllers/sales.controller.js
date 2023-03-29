// const salesService = require('../services/sales.service');

const { CustomError } = require('../errors/custom.error');

const getAll = async (_req, res, next) => {
  try {
    const result = await getAll();
    if (!result) throw CustomError('404', 'notFound');
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getById(id);
    if (!result) throw CustomError('404', 'notFound');
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
};
