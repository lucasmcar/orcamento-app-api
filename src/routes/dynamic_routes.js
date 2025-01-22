const express = require('express');
const clienteRouter = require('./cliente_route');
const servicoRouter = require('./servico_route');
const veiculoRouter = require('./veiculo_route');

const router = express.Router();

// Objeto para armazenar as rotas configuráveis
let dynamicRoutes = {};

// Endpoint para configurar as rotas dinâmicas
router.post('/', (req, res) => {
    const { clientRoute, serviceRoute, vehicleRoute } = req.params;

    // Validação das entradas
    if (!clientRoute || !serviceRoute || !vehicleRoute) {
        return res.status(400).json({ message: 'Os nomes das rotas são obrigatórios!' });
    }

    // Armazenar os nomes das rotas
    dynamicRoutes = {
        clientRoute,
        serviceRoute,
        vehicleRoute,
    };

    console.log('Rotas dinâmicas configuradas:', dynamicRoutes);
    return res.status(200).json({ message: 'Rotas configuradas com sucesso!' });
});

// Middleware para redirecionar as rotas dinâmicas
router.use((req, res, next) => {
    if (req.path.startsWith(`/${dynamicRoutes.clientRoute}`)) {
        return clienteRouter(req, res, next);
    } else if (req.path.startsWith(`/${dynamicRoutes.serviceRoute}`)) {
        return servicoRouter(req, res, next);
    } else if (req.path.startsWith(`/${dynamicRoutes.vehicleRoute}`)) {
        return veiculoRouter(req, res, next);
    }
    next();
});

module.exports = router;