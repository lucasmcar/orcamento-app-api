const express = require('express');
const cors = require('cors');
const swaggerDocs = require('./config/swagger/swagger');
const swaggerUi = require('swagger-ui-express');
const servicoRoute = require('./src/routes/servico_route');
const clienteRoute = require('./src/routes/cliente_route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware para capturar a URL base
app.use((req, res, next) => {
    const protocol = req.protocol; // http ou https
    const host = req.get('host'); // Dominio e porta
    req.baseUrlDynamic = `${protocol}://${host}`; // Ex: http://localhost:4000
    console.log(`URL base capturada: ${req.baseUrlDynamic}`);
    next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas específicas
app.use(clienteRoute);
app.use(servicoRoute);

// Rotas dinâmicas
/*app.use('/:tableName', (req, res, next) => {
    const { tableName } = req.params;
    console.log(`Rota dinâmica acessada: ${req.originalUrl}`);
    console.log(`Tabela: ${tableName}`);

    // Validação de tabelas dinâmicas permitidas
    const validTables = ['cliente', 'servico']; // Lista de tabelas permitidas
    if (!validTables.includes(tableName)) {
        return res.status(404).json({ message: `Tabela '${tableName}' não encontrada.` });
    }

    // Defina uma propriedade na requisição para a tabela
    req.tableName = tableName;
    next();
});
*/
const port = 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});