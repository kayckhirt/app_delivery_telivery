const { Router } = require('express');
const productsController = require('../controllers/products.controller');

const router = Router();

router.get('/products/:id', productsController.getById);
router.get('/products', productsController.getAll);

module.exports = router;
