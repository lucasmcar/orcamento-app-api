const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    search_path: ['public']
    
});

// Testar conexão com o banco de dados
/*pool.connect((err, release) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
    } else {
      console.log('Conectado ao banco de dados PostgreSQL');
      
    }
    release();
  });*/

  pool.connect((err, client, release) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados PostgreSQL');
    release(); // Libera o cliente de volta ao pool
});

console.log('Configuração do pool:', pool.options);

module.exports = pool;