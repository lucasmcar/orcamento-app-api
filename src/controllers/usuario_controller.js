const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretKey } = require('../middlewares/auth_middleware');
const pool = require('../../config/database/database');

// Simulação de banco de dados
// Registrar um novo usuário
exports.register = async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).json({ message: 'Usuario e senha são obrigatórios.' });
    }

    try {
        const criptSenha= await bcrypt.hash(senha, 10);
        const result = await pool.query(
            'INSERT INTO usuario (usurio, senha) VALUES ($1, $2) RETURNING id',
            [usuario, criptSenha]
        );

        res.status(201).json({ message: 'Usuário registrado com sucesso.', userId: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
};

// Fazer login
exports.login = async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [usuario]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado.' });
        }

        const user = result.rows[0];
        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            return res.status(403).json({ message: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ id: user.id, usuario: user.usuario }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao fazer login.' });
    }
};