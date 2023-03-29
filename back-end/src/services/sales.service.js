const { Sale } = require('../database/models');
// const { CustomError } = require('../errors/custom.error');

const getAll = async () => Sale.findAll();

const getById = async (saleId) => Sale.findByPk(saleId);

const create = async () => {};

module.exports = {
  getById,
  create,
  getAll,
};
