const express = require("express");
const veiculoController = require("../controllers/veiculo_controller");

const { authenticateToken } = require("../middlewares/auth_middleware");

const router = express.Router();

router.route('/veiculos').get(authenticateToken, veiculoController.getVeiculos);
router.route('/veiculo/:id_cliente').get(authenticateToken, veiculoController.veiculoPorCliente);
router.route('/veiculo/:placa').get(authenticateToken, veiculoController.veiculoPorPlaca);


router.route('/veiculo/edit/:id').put(authenticateToken, veiculoController.updateVeiculo);
router.route('/veiculo/:id').delete(authenticateToken, veiculoController.deleteVeiculo);
router.route('/veiculo/add').post(authenticateToken, veiculoController.addVeiculo);
