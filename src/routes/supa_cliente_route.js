const supaClienteController = require('../controllers/supa_cliente_controller');

const express = require("express");

const router = express.Router();

router
    .route('/supa/clientes')
    .get(supaClienteController.getSupaClientes);


module.exports = router;