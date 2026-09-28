# 🩺 Prontuário+

O **Prontuário+** é uma aplicação web desenvolvida para auxiliar médicos no gerenciamento de seus pacientes e no registro de atendimentos.

A aplicação permite centralizar informações pessoais e clínicas dos pacientes, acompanhar seu histórico de atendimentos e gerar relatórios em PDF.

🚧 O projeto ainda está em fase de desenvolvimento.

## 🚀 Funcionalidades

### 🔐 Autenticação

> **Acesso protegido por autenticação JWT**

- Cadastro de médicos
- Login
- Autenticação utilizando JWT
- Rotas protegidas
- Associação dos pacientes ao médico autenticado

### 👤 Pacientes

> **Gerenciamento completo dos pacientes**

- Cadastro de pacientes
- Listagem
- Visualização dos dados
- Atualização
- Exclusão
- Busca de pacientes
- Associação entre **caso índice** e **familiares**

### 🩺 Atendimentos

> **Registro do histórico clínico do paciente**

Cada atendimento pode conter:

- Anamnese
- Diagnóstico
- Conduta
- Prescrição
- Observações
- Data e horário do atendimento

### 📄 Relatórios

> **Transforme um atendimento em um documento PDF**

O sistema permite gerar e baixar um relatório contendo:

- Dados pessoais do paciente
- Data do atendimento
- Anamnese
- Diagnóstico
- Conduta
- Prescrição
- Observações

## 🛠️ Tecnologias

- React
- TypeScript
- Vite
- React Router
- Axios
- date-fns
- CSS

---

## 🧩 Arquitetura

```text
src
├── api
├── assets
├── components
├── hooks
├── pages
│   ├── auth
│   ├── patient
│   └── attendance
├── routes
├── types
├── App.tsx
└── main.tsx

```

## 🚀 Como executar

### Pré-requisitos
- Node.js
- npm
- MongoDB

Entre na pasta do projeto

Instale as dependências:

```
npm install
```

Crie um arquivo .env:

```
VITE_PRONTUARIO_API=http://localhost:3003
```

Inicie a aplicação:

```
npm run dev
```