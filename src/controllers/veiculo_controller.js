const pool = require('../../config/database/database');


const TABLE_NAME = 'veiculo';

exports.getVeiculos = async (req, res) => {
    const query = `SELECT * FROM ${TABLE_NAME}`;

    try {
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

exports.veiculoPorCliente = async (req, res) => {
    const { id_cliente } = req.params;

    const query = `SELECT * FROM ${TABLE_NAME} WHERE id_cliente = $1`;
    try{
        pool.query(query, [id_cliente], (err, results) => {
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

exports.veiculoPorPlaca = async (req, res) => {
    const { placa } = req.params;

    const query = `SELECT * FROM ${TABLE_NAME} WHERE placa = $1`;
    try{
        pool.query(query, [placa], (err, results) => {
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



exports.addVeiculo = async (req, res) => {
    const {modelo, marca, ano, placa, cor, id_cliente } = req.body;

    const query = `INSERT INTO ${TABLE_NAME} (modelo, marca, ano, placa, cor, id_cliente) VALUES ($1, $2, $3, $4, $5)`;
    try{

        
        pool.query(query, [modelo, marca,  ano, placa, cor, id_cliente], (err, res) => {
            if (err) {
                throw err;
            }
            res.status(201).send(`Veículo adicionado com sucesso!`);
        });

    } catch( err ){
        console.error('Erro na consulta:', err);
        res.status(500).send('Erro interno do servidor');
    }
}


exports.deleteVeiculo = async (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM ${TABLE_NAME} WHERE id = $1`;
    try{
        pool.query(query, [id], (err, res) => {
            if (err) {
                throw err;
            }
            res.status(200).send(`Veículo deletado com sucesso!`);
        });

    } catch( err ){
        console.error('Erro na consulta:', err);
        res.status(500).send('Erro interno do servidor');
    }
}

exports.updateVeiculo = async (req, res) => {
    const { id } = req.params;
    const {modelo, marca, ano, placa, cor, id_cliente } = req.body;

    const query = `UPDATE ${TABLE_NAME} SET modelo = $1, marca = $2, ano = $3, placa = $4, cor = $5, id_cliente = $6 WHERE id = $7`;
    try{
        pool.query(query, [modelo, marca, ano, placa, cor, id_cliente, id], (err, res) => {
            if (err) {
                throw err;
            }
            res.status(201).send(`Veículo atualizado com sucesso!`);
        });

    } catch( err ){
        console.error('Erro na consulta:', err);
        res.status(500).send('Erro interno do servidor');
    }
}

