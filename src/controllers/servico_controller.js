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
        res.status(200).json({ // Inclui a URL base na resposta (opcional)
            data: results.rows,
    });
    } catch (err) {
        console.error('Erro na consulta:', err);
        res.status(500).send('Erro interno do servidor');
    }
   /* const { serviceRoute } = req.params;
     const query = `SELECT * FROM ${TABLE_NAME} where service_route = $1`;
     await pool.query(query, [serviceRoute], (err, results) => {
        if (err) {
            throw err;
        }
        res.statusCode = 200;
        res.json(results.rows);
    });*/
}

exports.addServico = async (req, res) => {

    const { serviceRoute } = req.params; 

    const tableName = routeMappings[serviceRoute];
    const {descricao, valor, data_servico, id_cliente } = req.body;
    const query = `INSERT INTO ${tableName} (descricao, valor, data_servico, id_cliente) VALUES ($1, $2, $3, $4)`;
    pool.query(query, [descricao, valor, data_servico, id_cliente], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(201).send(`Serviço adicionado com sucesso!`);
    });
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