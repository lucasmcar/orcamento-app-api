const supabase = require('../../config/supabase/client');

exports.getSupaClientes = async (req, res) => {
    const { data, error } = await supabase
            .from('cliente')
            .select('*');

        if (error) {
            return res.status(500).json({ error: 'Erro ao obter clientes', message: error.message });
        }

        return res.status(200).json({ data });
}
