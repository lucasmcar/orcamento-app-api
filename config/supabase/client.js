const { createClient } = require('@supabase/supabase-js');

// Substitua com as informações do seu projeto no Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Cria a instância do Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;