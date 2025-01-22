const pool = require('../../config/database/database');

const TABLE_NAME = 'cliente';

exports.getClientes = async (req, res) => {

    // Construa a consulta com a tabela correspondente
    const query = `SELECT * FROM ${TABLE_NAME}`;

    try {
        const baseUrl = req.baseUrlDynamic;
        const results = await pool.query(query);

        // Se não houver resultados, retorna um erro ou uma resposta de "não encontrado"
        if (results.rows.length === 0) {
            return res.status(404).json({ message: `Nenhum dado encontrado aqui!` });
        }

        // Caso contrário, retorna os resultados encontrados
        res.status(200).json({ // Inclui a URL base na resposta (opcional)
            data: results.rows,
    });
    } catch (err) {
        console.error('Erro na consulta:', err);
        res.status(500).send('Erro interno do servidor');
    }
}

exports.addCliente = async (req, res) => {
    const {nome, email, telefone, endereco } = req.body;

    const query = `INSERT INTO ${TABLE_NAME} (nome, email, telefone, endereco) VALUES ($1, $2, $3, $4)`;
    try{

        
        pool.query(query, [nome, email, telefone, endereco], (err, res) => {
            if (err) {
                throw err;
            }
            res.status(201).send(`Cliente adicionado com sucesso!`);
        });

    } catch( err ){
        console.error('Erro na consulta:', err);
        res.status(500).send('Erro interno do servidor');
    }
}

exports.updateCliente = async (req, res) => {
    const { id } = req.params;
    const {nome, email, telefone, endereco } = req.body;

    const query = `UPDATE ${TABLE_NAME} SET nome = $1, email = $2, telefone = $3, endereco = $4 WHERE id = $5`;
    try{

        
        pool.query(query, [nome, email, telefone, endereco, id], (err, res) => {
            if (err) {
                throw err;
            }
            res.status(201).send(`Cliente atualizado com sucesso!`);
        });

    } catch( err ){
        console.error('Erro na consulta:', err);
        res.status(500).send('Erro interno do servidor');
    }
}

exports.getClientesPorId = async (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
    try{

        
        pool.query(query, [id], (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).json(results.rows);
        });

    } catch( err ){
        console.error('Erro na consulta:', err);
        res.status(500).send('Erro interno do servidor');
    }
}

exports.getClientes2 = async (req, res) => {
    const { data, error } = await supabase
            .from('cliente')
            .select('*');

        if (error) {
            return res.status(500).json({ error: 'Erro ao obter clientes', message: error.message });
        }

        return res.status(200).json({ data });
}
    