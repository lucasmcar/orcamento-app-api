const express = require('express');
const cors = require('cors');
const servicoRoute = require('./src/routes/servico_route');



const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use((req, res, next) => {
    const protocol = req.protocol; // http ou https
    const host = req.get('host'); // Dominio e porta
    req.baseUrlDynamic = `${protocol}://${host}`; // Ex: http://localhost:4000
    console.log(`URL base capturada: ${req.baseUrlDynamic}`);
    next();
});

app.use(servicoRoute);

const port = 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})