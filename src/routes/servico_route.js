const express = require('express');
const servicoController = require('../controllers/servico_controller');

const router = express.Router();



router
    .route('/teste')
    .get(servicoController.testeTabela);

router
    .route('/add/servico')
    .post(servicoController.addServico);

    router
    .route('/:tableName')
    .get(servicoController.getServicos);

module.exports = router;

