const express = require('express');
const authController = require('../controllers/usuario_controller');

const router = express.Router();

// Rota para registrar um usuário
router.route('/registrar',).post(authController.register);

// Rota para login
router.route('/login').post(authController.login);
    

module.exports = router;