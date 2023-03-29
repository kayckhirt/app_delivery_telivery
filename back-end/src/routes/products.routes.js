const { Router } = require('express');
const productsController = require('../controllers/products.controller');
const productFields = require('../middlewars/products.fields.middleware');

const router = Router();

router.get('/products/:id', productsController.getById);
router.get('/products', productsController.getAll);
router.post('/products', productFields, productsController.create);

module.exports = router;
