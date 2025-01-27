const pool = require('../../config/database/database.js');

const TABLE_NAME = 'servico';

exports.getServicos = async (req, res) => {


    // Construa a consulta com a tabela correspondente
    const query = `SELECT * FROM ${TABLE_NAME}`;

    try {

        const results = await pool.query(query);

        // Se não houver resultados, retorna um erro ou uma resposta de "não encontrado"
        if (results.rows.length === 0) {
            return res.status(404).json({ message: `Nenhum dado encontrado!` });
        }

        // Caso contrário, retorna os resultados encontrados
        res.status(200).json({
            data: results.rows,
    });
    } catch (err) {
        console.error('Erro na consulta:', err);
        res.status(500).send('Erro interno do servidor');
    }
   
}

exports.addServico = async (req, res) => {

    const {descricao, valor, data_servico, aprovado, codigo, id_cliente } = req.body;
    const query = `INSERT INTO ${tableName} (descricao, valor, data_servico, aprovado, codigo, id_cliente) VALUES ($1, $2, $3, $4, $5, $6)`;
    pool.query(query, [descricao, valor, data_servico, id_cliente], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(201).send(`Serviço adicionado com sucesso!`);
    });
}

exports.updateServico = async (req, res) => {
    const { id } = req.params;
    const {descricao, valor, data_servico, aprovado, id_cliente } = req.body;

    const query = `UPDATE ${TABLE_NAME} SET descricao = $1, valor = $2, data_servico = $3, aprovado = $4, codigo = $5, id_cliente = $6 WHERE id = $7`;
    try{
        pool.query(query, [descricao, valor, data_servico, aprovado, id_cliente, id], (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).send(`Serviço atualizado com sucesso!`);
        });
    } catch( err ){
        console.error('Erro na consulta:', err);
        res.status(500).send('Erro interno do servidor');
    }
}

exports.servicoPorCodigo = async (req, res) => {
    const { codigo } = req.params;

    const query = `SELECT * FROM ${TABLE_NAME} WHERE codigo = $1`;
    try{
        pool.query(query, [codigo], (err, results) => {
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

exports.servicoPorCliente = async (req, res) => {
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

exports.deleteServico = async (req, res) => {
    const { codigo } = req.params;

    const query = `DELETE FROM ${TABLE_NAME} WHERE id = $1`;
    try{
        pool.query(query, [codigo], (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).send(`Serviço deletado com sucesso!`);
        });
    } catch( err ){
        console.error('Erro na consulta:', err);
        res.status(500).send('Erro interno do servidor');
    }
}



exports.testeTabela = async (req, res) => {
    const query = `
    SELECT table_schema, table_name 
    FROM information_schema.tables 
    WHERE table_name = 'servico';
  `;
  
  try {
    const results = await pool.query(query);
    console.log('Tabelas encontradas:', results.rows);
  } catch (err) {
    console.error('Erro ao buscar tabelas:', err.message);
  }

}