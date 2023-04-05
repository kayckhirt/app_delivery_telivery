const { Router } = require('express');
const salesService = require('../controllers/sales.controller');

const router = Router();

router.get('/sales/orders', salesService.getByUserId);
router.get('/sales', salesService.getAll);
router.get('/sales/:id', salesService.getById);
router.get('/sales/details/:saleId', salesService.getSaleDetails);
router.post('/sales', salesService.createSaleAndSaleProduct);

module.exports = router;
