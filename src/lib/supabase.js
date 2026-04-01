import { createClient } from '@supabase/supabase-js';

// Ambos os valores são carregados de variáveis de ambiente (.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY são obrigatórias. ' +
    'Verifique o arquivo .env na raiz do projeto.'
  );
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
