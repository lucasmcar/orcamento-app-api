const express = require("express");
const clienteController = require("../controllers/cliente_controller");

const router = express.Router();

/**
 * @swagger
 * /cliente/add/cliente:
 *   post:
 *     summary: Adicionar um novo cliente
 *     tags: [Cliente]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               endereco:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente adicionado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno no servidor
 */
router.route("/add/cliente").post(clienteController.addCliente);


router.route("/editar/cliente/:id").put(clienteController.updateCliente);



router.route("/clientes").get(clienteController.getClientes);
router.route("/cliente2").get(clienteController.getClientes2);

/**
 * @swagger
 * /cliente/{id}:
 *   get:
 *    summary: Obter um cliente por ID
 *    tags: [Cliente]
 *    parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID do cliente
 *       schema:
 *         type: integer
 *    responses:
 *      200:
 *        description: Cliente encontrado
 *      404:
 *        description: Cliente não encontrado
 *      500:
 *        description: Erro interno no servidor
 * 
 */
router.route("/cliente/:id").get(clienteController.getClientesPorId);

router;

module.exports = router;
