/**
 * Logger condicional que só exibe mensagens no console em ambiente de desenvolvimento.
 * Em produção, silencia todos os logs para evitar vazamento de informações internas
 * (nomes de tabelas, error codes do Supabase/PostgreSQL, stack traces, etc.).
 */
const isDev = import.meta.env.DEV;

export const logger = {
  error: (...args) => { if (isDev) console.error(...args); },
  warn:  (...args) => { if (isDev) console.warn(...args);  },
  info:  (...args) => { if (isDev) console.info(...args);  },
  log:   (...args) => { if (isDev) console.log(...args);   },
};
