const conPg = require('../config/database/database');

const TABLE_NAME = 'orcamento_tb';

/**
 * Consultas
 */
exports.getOrcamentos = async (req, res) => {
    const query = `SELECT * FROM ${TABLE_NAME}`;
    const response = await conPg.query(query);
    res.status(200).json(response.rows);
}




/**
 * Inserts
 */

/**
 * Updates
 */

/**
 * Deletes
 */