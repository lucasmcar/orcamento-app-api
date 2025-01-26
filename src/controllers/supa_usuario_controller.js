const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretKey } = require('../middlewares/auth_middleware');

const supabase = require('../../config/supabase/client');

exports.register = async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).json({ message: 'Usuario e senha são obrigatórios.' });
    }

    try {
        const criptSenha = await bcrypt.hash(senha, 10);
        const { data, error } = await supabase
            .from('usuario')
            .insert([{ usuario, senha: criptSenha }]);

        if (error) {
            return res.status(500).json({ message: 'Erro ao registrar usuário.' });
        }

        res.status(201).json({ message: 'Usuário registrado com sucesso.', userId: data[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
}

exports.login = async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        const { data, error } = await supabase
            .from('usuario')
            .select('*')
            .eq('usuario', usuario);

        if (error) {
            return res.status(500).json({ message: 'Erro ao fazer login.' });
        }

        if (data.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado.' });
        }

        const user = data[0];
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
}