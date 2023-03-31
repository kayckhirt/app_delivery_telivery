const { Router } = require('express');
const salesService = require('../controllers/sales.controller');

const router = Router();

router.get('/sales', salesService.getAll);
router.get('/sales:id', salesService.getById);
router.post('/sales', salesService.createSaleAndSaleProduct);

module.exports = router;
