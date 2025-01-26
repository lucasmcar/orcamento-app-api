const supaUsuarioController = require("../controllers/supa_usuario_controller");

const express = require("express");

const router = express.Router();

router.route('/supa/criar').post(supaUsuarioController.register);
router.route('/supa/login').post(supaUsuarioController.login);

module.exports = router;
