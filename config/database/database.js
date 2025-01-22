const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    search_path: ['public']
    
});

  pool.connect((err, client, release) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados PostgreSQL');
    release(); // Libera o cliente de volta ao pool
});

//console.log('Configuração do pool:', pool.options);

module.exports = pool;