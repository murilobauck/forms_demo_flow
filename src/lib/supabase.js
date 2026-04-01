import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xnlziqladdfhrimyraxm.supabase.co';
// Acesse o arquivo .env criado na raiz do projeto para inserir sua chave
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'coloque_sua_publishable_key_aqui';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
