const sequelize = require('sequelize');
const { Sale, SalesProduct } = require('../database/models');
const userService = require('./users.service'); 
const { CustomError } = require('../errors/custom.error');
// const { CustomError } = require('../errors/custom.error');

const getAll = async () => Sale.findAll();

const getById = async (saleId) => Sale.findByPk(saleId);

const createSale = async ({ userId, 
  sellerId, 
  totalPrice,
  deliveryAddress,
  deliveryNumber }) => {
  const newSale = await Sale.create({ userId, 
    sellerId, 
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate: sequelize.fn('NOW'),
    status: 'Pendente' });
  return newSale;
};

const createSaleAndSaleProduct = async ({ products, ...saleData }) => {
    const user = await userService.getByUserId(saleData.userId);
    if (user.role !== 'customer') throw CustomError('401', 'O ID informado não é de um cliente');
    
    const seller = await userService.getByUserId(saleData.sellerId);
    if (seller.role !== 'seller') throw CustomError('401', 'O ID informado não é de um vendedor');

    const newSale = await createSale(saleData);

      const mapQuantity = products.map(({ productId, quantity }) => (
        { saleId: newSale.id, productId, quantity }));

      await SalesProduct.bulkCreate(mapQuantity);
    return { message: 'Venda cadastrada com sucesso', id: newSale.id };
};

module.exports = {
  getById,
  createSaleAndSaleProduct,
  getAll,
};
