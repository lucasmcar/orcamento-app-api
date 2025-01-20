const express = require('express');
const servicoController = require('../controllers/servico_controller');

const router = express.Router();

router
    .route('/:serviceRoute')
    .get(servicoController.getServicos);

router
    .route('/teste')
    .get(servicoController.testeTabela);

router
    .route('/add/servico')
    .post(servicoController.addServico);


module.exports = router;

