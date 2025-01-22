const swaggerDoc = require('swagger-jsdoc');

// Configuração do Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Versão do OpenAPI
        info: {
            title: 'API de Gestão',
            version: '1.0.0',
            description: 'Documentação da API para gestão de clientes e serviços',
        },
        servers: [
            {
                url: 'http://localhost:4000', // URL base do seu servidor
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Caminho dos arquivos de rotas para gerar a documentação automaticamente
};

const swaggerDocs = swaggerDoc(swaggerOptions);

module.exports = swaggerDocs;