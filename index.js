const express = require('express');
const cors = require('cors');
const swaggerDocs = require('./config/swagger/swagger');
const swaggerUi = require('swagger-ui-express');
/**
 * DEV
 */
const servicoRoute = require('./src/routes/servico_route');
const clienteRoute = require('./src/routes/cliente_route');
const authRoute = require('./src/routes/auth_route');
/**
 * Supabase
 */
const supaAuthRoute = require('./src/routes/supa_auth_route');
const supaClienteRoute = require('./src/routes/supa_cliente_route');
const app = express();
const { authenticateToken } = require('./src/middlewares/auth_middleware');

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

app.use(authRoute);

app.use(supaAuthRoute);
// Rotas específicas




app.use(authenticateToken, clienteRoute);
app.use(authenticateToken, servicoRoute);


app.use(authenticateToken, supaClienteRoute);


const port = 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});