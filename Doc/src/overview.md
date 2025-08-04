# Visão Geral do Projeto

## O Projeto

O **ColaAqui** é uma plataforma de conteúdo versátil, construída sobre uma arquitetura 100% serverless na AWS. Seu objetivo é fornecer uma maneira extremamente simples e de baixo custo para armazenar e distribuir conteúdo pela web.

A flexibilidade da sua API permite que o ColaAqui seja utilizado tanto por pessoas, através de uma interface web minimalista, quanto por máquinas, que podem consumir seu conteúdo como um Micro CMS Headless. Isso o torna ideal para projetos que vão desde o compartilhamento rápido de notas até a alimentação de conteúdo para sites estáticos, aplicativos móveis ou qualquer outro frontend.

## Funcionalidades

As funcionalidades do ColaAqui podem ser vistas sob duas óticas:

#### Como uma Ferramenta (Pastebin)
- **Interface de Criação:** Uma página web simples para colar/digitar texto.
- **Link Único de Compartilhamento:** Geração de um ID curto para cada "paste".
- **Expiração Automática:** Definição de um tempo de vida para que o conteúdo seja removido.
- **Página de Visualização:** Uma URL limpa para exibir o conteúdo compartilhado.

#### Como uma Plataforma (CMS Headless)
- **API para CRUD de Conteúdo:** Endpoints para Criar, Ler, Atualizar e Deletar (`POST`, `GET`, `PUT`, `DELETE`) blocos de conteúdo.
- **Conteúdo Estruturado:** Suporte para salvar conteúdo em formato JSON, além de texto puro.
- **Entrega via API:** O conteúdo pode ser requisitado por qualquer aplicação através de chamadas HTTP.
- **Segurança de Acesso (Futuro):** Capacidade de proteger endpoints com chaves de API.

## Pilha de Tecnologias (Tech Stack)

A pilha de tecnologias foi escolhida para suportar a natureza flexível e escalável do projeto:

- **Frontend:**
  - **Framework:** React.js com TypeScript
  - **Build Tool:** Vite
  - **Hospedagem:** AWS S3 + CloudFront (Site Estático)

- **Backend (A API de Conteúdo):**
  - **Plataforma:** Node.js com TypeScript
  - **Framework:** Express.js
  - **Ambiente:** AWS Lambda (Serverless)
  - **Gateway:** AWS API Gateway

- **Banco de Dados & Armazenamento:**
  - **Metadados e Conteúdo JSON:** AWS DynamoDB
  - **Conteúdo de Arquivos (Texto, etc.):** AWS S3

- **Infraestrutura como Código (IaC):**
  - **Gerenciamento:** Serverless Framework
  - **Templates:** AWS CloudFormation