const pool = require('../../config/database/database.js');

const TABLE_NAME = 'servico';

const routeMappings = {
    'servico': 'servico',  // Quando a rota for 'tabela_servico', a consulta vai buscar na tabela 'servico'
    'tabela_outro_servico': 'outro_servico',  // Exemplo de outra tabela
    // Adicione mais mapeamentos conforme necessário
};

exports.getServicos = async (req, res) => {

    const { serviceRoute } = req.params; 
    console.log(serviceRoute) // Acessa o parâmetro dinâmico da rota
    
    // Verifica se a rota existe no mapeamento
    const tableName = routeMappings[serviceRoute];

    console.log('Tabela:', tableName);
    
    if (!tableName) {
        return res.status(404).json({ message: `Rota '${serviceRoute}' não encontrada.` });
    }
    
    // Construa a consulta com a tabela correspondente
    const query = `SELECT * FROM ${tableName}`;

    try {
        const baseUrl = req.baseUrlDynamic;
        const results = await pool.query(query);

        // Se não houver resultados, retorna um erro ou uma resposta de "não encontrado"
        if (results.rows.length === 0) {
            return res.status(404).json({ message: `Nenhum dado encontrado para a rota: ${serviceRoute}` });
        }

        // Caso contrário, retorna os resultados encontrados
        res.status(200).json({
            baseUrl, // Inclui a URL base na resposta (opcional)
            data: result.rows,
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
    const {descricao, valor, data_servico, id_cliente } = req.body;
    const query = `INSERT INTO ${TABLE_NAME} (descricao, valor, data_servico, id_cliente) VALUES ($1, $2, $3, $4)`;
    await pool.query(query, [descricao, valor, data_servico, id_cliente], (err, results) => {
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