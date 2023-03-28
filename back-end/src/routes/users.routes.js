const { Router } = require('express');
const userController = require('../controllers/users.controller');

const router = Router();

router.get('/login', userController.login);

module.exports = router;
