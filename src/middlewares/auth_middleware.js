const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.API_KEY; // Substitua por uma chave segura

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        req.user = user; // Usuário decodificado
        next();
    });
};

module.exports = {
    authenticateToken,
    secretKey,
};