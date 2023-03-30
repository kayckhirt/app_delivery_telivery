const { Router } = require('express');
const userController = require('../controllers/users.controller');
const authMiddleware = require('../middlewars/auth.middleware');

const router = Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/auth', authMiddleware, userController.getByToken);

module.exports = router;
