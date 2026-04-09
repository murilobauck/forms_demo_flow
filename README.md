# Flow — Formulário de Acesso Antecipado

<p align="center">
  <strong>Landing page com formulário de captação de leads para acesso antecipado a cursos técnicos.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3FCF8E?logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/License-Private-red" alt="License" />
</p>

---

## 📋 Sobre o Projeto

**Flow** é uma aplicação web construída com React + Vite que apresenta um formulário estilizado para captação de leads interessados em cursos técnicos. O formulário coleta informações pessoais e as armazena em um banco de dados Supabase, com foco em segurança, conformidade legal (LGPD / Marco Civil da Internet) e experiência de usuário premium.

### Principais Funcionalidades

- 🎨 **Design premium dark-mode** com imagem de fundo, scrollbar customizada e micro-animações
- 📝 **Formulário completo** com campos de nome, e-mail, telefone, curso e série
- 🔒 **Segurança robusta**: sanitização allow-list, validação de inputs e rate limiting por dispositivo
- 🛡️ **Conformidade legal**: checkbox obrigatório de consentimento com links para Política de Privacidade e Termos de Uso
- 📡 **Backend Supabase**: persistência de leads com captura de IP e registro de consentimento
- 🔕 **Logger condicional**: suprime logs sensíveis em produção
- 💾 **Persistência de estado**: dados do formulário são salvos em `sessionStorage` durante a navegação

---

## 🛠️ Tech Stack

| Camada       | Tecnologia                                 |
| ------------ | ------------------------------------------ |
| **Frontend** | React 19, React Router DOM 7               |
| **Build**    | Vite 8                                     |
| **Backend**  | Supabase (PostgreSQL + Auth + RLS)         |
| **Estilo**   | Vanilla CSS com Design Tokens customizados |
| **Lint**     | ESLint 9                                   |
| **Pacotes**  | pnpm                                       |

---

## 📁 Estrutura do Projeto

```
forms_demo_flow/
├── public/
│   ├── background.png          # Imagem de fundo da aplicação
│   └── favicon.svg             # Ícone do site
├── src/
│   ├── assets/                 # Assets estáticos (reservado)
│   ├── components/
│   │   ├── form/
│   │   │   ├── GenericForm.jsx # Componente principal do formulário
│   │   │   └── GenericForm.css # Estilos do formulário
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx  # Layout com scrollbar customizada
│   │   │   └── MainLayout.css  # Estilos do layout
│   │   └── legal/
│   │       ├── PrivacyPolicy.jsx  # Página de Política de Privacidade
│   │       ├── TermsOfUse.jsx     # Página de Termos de Uso
│   │       └── LegalPage.css      # Estilos das páginas legais
│   ├── lib/
│   │   ├── supabase.js         # Cliente Supabase configurado
│   │   └── logger.js           # Logger condicional (dev/prod)
│   ├── styles/
│   │   └── design-tokens.css   # Variáveis CSS (cores, fontes, sombras)
│   ├── App.jsx                 # Rotas e componente raiz
│   ├── App.css                 # Estilos globais do app
│   ├── index.css               # Reset e estilos base
│   └── main.jsx                # Entry point do React
├── .env                        # Variáveis de ambiente (não versionado)
├── .gitignore
├── index.html                  # HTML template
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 🚀 Como Rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (ou npm/yarn)
- Conta no [Supabase](https://supabase.com/) com uma tabela `leads` configurada

### 1. Clonar o repositório

```bash
git clone https://github.com/murilobauck/forms_demo_flow.git
cd forms_demo_flow
```

### 2. Instalar dependências

```bash
pnpm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_sua_chave_aqui
```

### 4. Iniciar o servidor de desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`.

### 5. Build para produção

```bash
pnpm build
pnpm preview
```

---

## 🗄️ Banco de Dados (Supabase)

A aplicação espera uma tabela `leads` no Supabase com a seguinte estrutura:

| Coluna                  | Tipo      | Descrição                             |
| ----------------------- | --------- | ------------------------------------- |
| `id`                    | `uuid`    | Chave primária (gerada automaticamente) |
| `name`                  | `text`    | Nome completo do lead                 |
| `email`                 | `text`    | E-mail do lead                        |
| `phone`                 | `text`    | Telefone de contato                   |
| `course`                | `text`    | Curso técnico selecionado             |
| `grade`                 | `text`    | Série (1º, 2º ou 3º)                 |
| `consent_marketing`     | `boolean` | Consentimento para comunicações       |
| `consent_privacy_terms` | `boolean` | Aceitação da Política e Termos        |
| `ip_address`            | `text`    | IP do usuário (Marco Civil)           |
| `created_at`            | `timestamptz` | Data/hora do registro             |

> **⚠️ Importante:** Configure [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security) para que a chave pública permita apenas operações de `INSERT` na tabela `leads`.

---

## 🔐 Segurança

O projeto implementa múltiplas camadas de segurança:

1. **Sanitização allow-list** — Cada tipo de campo aceita apenas caracteres permitidos (regex allow-list aplicada em tempo real no `onChange`)
2. **Validação final** — Antes do envio, os dados passam por uma segunda validação regex
3. **Rate limiting por dispositivo** — Máximo de 3 submissões a cada 24 horas (via `localStorage`)
4. **Variáveis de ambiente** — Credenciais do Supabase carregadas exclusivamente via `.env`
5. **Logger condicional** — Logs de erro só aparecem no console em modo de desenvolvimento
6. **RLS no Supabase** — A chave pública (publishable key) deve ter permissão apenas de `INSERT`
7. **Captura de IP** — Registrado para conformidade com o Marco Civil da Internet

---

## 🎨 Design System

O projeto utiliza CSS custom properties (Design Tokens) centralizados em `src/styles/design-tokens.css`:

| Token                         | Valor              | Uso                      |
| ----------------------------- | ------------------ | ------------------------ |
| `--color-primary`             | `#DB2164`          | Cor de destaque / accent |
| `--color-surface`             | `#2c2c2e`          | Cor dos cards / surfaces |
| `--color-background-fallback` | `#121214`          | Fundo escuro fallback    |
| `--color-text`                | `#ffffff`          | Texto principal          |
| `--color-text-secondary`      | `#a0a0a5`          | Texto secundário         |
| `--font-family-main`          | `Inter, system-ui` | Tipografia               |
| `--border-radius-main`        | `32px`             | Border radius dos cards  |

---

## 📜 Rotas

| Rota             | Componente      | Descrição                    |
| ---------------- | --------------- | ---------------------------- |
| `/`              | `GenericForm`   | Formulário de acesso antecipado |
| `/privacidade`   | `PrivacyPolicy` | Política de Privacidade      |
| `/termos`        | `TermsOfUse`    | Termos de Uso                |

---

## 📦 Scripts Disponíveis

| Comando         | Descrição                                   |
| --------------- | ------------------------------------------- |
| `pnpm dev`      | Inicia o servidor de desenvolvimento (Vite) |
| `pnpm build`    | Gera o bundle de produção em `/dist`        |
| `pnpm preview`  | Serve o build de produção localmente        |
| `pnpm lint`     | Executa o ESLint no projeto                 |

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Faça commit das suas alterações (`git commit -m 'feat: adiciona minha feature'`)
4. Faça push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

---

<p align="center">
  Feito com ❤️ e React
</p>
