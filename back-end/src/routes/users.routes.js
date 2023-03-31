const { Router } = require('express');
const userController = require('../controllers/users.controller');

const router = Router();

router.post('/login', userController.login);
router.get('/users/sellers', userController.getAllSellers);
router.post('/register', userController.register);
// router.post('/admin/manage', userController.register);

module.exports = router;