const express = require("express");
const servicoController = require("../controllers/servico_controller");
const { authenticateToken } = require("../middlewares/auth_middleware");

const router = express.Router();

router.route("/teste").get(servicoController.testeTabela);

router
  .route("/add/servico")
  .post(authenticateToken, servicoController.addServico);

router
    .route("/servicos")
    .get(authenticateToken, servicoController.getServicos);

router
  .route("/edit/servico/:id")
  .get(authenticateToken, servicoController.updateServico);
router
  .route("/servico/:codigo")
  .get(authenticateToken, servicoController.servicoPorCodigo);
router
  .route("/delete/servico/:id_cliente")
  .get(authenticateToken, servicoController.servicoPorCliente);

module.exports = router;
