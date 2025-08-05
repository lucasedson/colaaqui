# Referência da API ColaAqui (v1)
Esta documentação detalha os endpoints disponíveis na Versão 1 (v1) da API do ColaAqui.

**URL Base:** Todos os endpoints descritos abaixo são prefixados com a URL base: `/api/v1`.

****Autenticação:**** Endpoints marcados com `[Requer Autenticação]` necessitam de um Token JWT válido, que deve ser enviado no cabeçalho Authorization de cada requisição no formato Bearer `<seu_token_jwt>`.

----

### 1. Autenticação (/auth)
Endpoints responsáveis pelo registro, login e verificação de sessão de usuários.

`POST /auth/register`

****Descrição:**** Cria um novo usuário na plataforma.

**Corpo da Requisição (Body):** application/json com os dados do usuário (ex: name, email, password).

**Resposta de Sucesso:** Retorna os dados do usuário criado e um token de acesso.

----

`POST /auth/login`
**Descrição:** Autentica um usuário existente.

**Corpo da Requisição (Body):** application/json com as credenciais do usuário (ex: email, password).

**Resposta de Sucesso:** Retorna um token de acesso (JWT) para ser usado em requisições autenticadas.

----

`GET /auth/me`

**Descrição:** Retorna as informações do perfil do usuário atualmente autenticado.

**Autenticação:** [Requer Autenticação]

----

### 2. Conteúdos / Pastes (/contents)
Endpoints para o gerenciamento dos blocos de conteúdo (pastes).

`POST /contents`

**Descrição:** Cria um novo bloco de conteúdo.

**Autenticação:** [Requer Autenticação] (Opcional, pode ser aberto para pastes anônimos).

**Corpo da Requisição (Body):** application/json com os detalhes do conteúdo.

```JSON
{
  "title": "Meu Snippet",
  "content": "const message = 'Hello, World!';",
  "language": "javascript",
  "visibility": "public", // public, private, unlisted
  "expiresAtInMinutes": "3000",
  "collection": "my-collection",
  "tags": ["snippet", "code"]
}
```

**Upload de Arquivos:** Pode ser utilizado para enviar um arquivo junto com o conteúdo. O arquivo deve ser enviado como um campo multipart com o nome `file`. Maximum file size: 5MB.

**Formatos de conteudo:** Apenas texto. .txt, .json, .xls e etc..

----

`GET /contents`

**Descrição:** Retorna uma lista paginada de conteúdos públicos.

**Parâmetros de Query (Query Params):**

- **page (Number, opcional):** Número da página a ser retornada. Padrão: 1.

- **limit (Number, opcional):** Número de itens por página. Padrão: 20.

- **sortBy (String, opcional):** Campo para ordenação (ex: createdAt).

- **order (String, opcional):** Ordem da classificação (asc ou desc).

- **tags (String, opcional):** Filtra por tags, separadas por vírgula.

----

`GET /contents/:id`

**Descrição:** Busca um único bloco de conteúdo pelo seu ID. O acesso a conteúdos privados requer autenticação e posse do recurso.

----

`PUT /contents/:id`

**Descrição:** Atualiza um bloco de conteúdo existente.

**Autenticação:** [Requer Autenticação]

**Autorização:** Requer que o usuário autenticado seja o proprietário do conteúdo.

----

`DELETE /contents/:id`

**Descrição:** Exclui permanentemente um bloco de conteúdo.

**Autenticação:** [Requer Autenticação]

**Autorização:** Requer que o usuário autenticado seja o proprietário do conteúdo.

### 3. Usuários (/users)
Endpoints para o gerenciamento de dados de usuários.

`GET /users/:id`

**Descrição:** Busca o perfil público de um usuário (sem informações sensíveis) pelo seu ID.

----

`PUT /users/me`

**Descrição:** Permite que o usuário autenticado atualize os dados do seu próprio perfil.

**Autenticação:** [Requer Autenticação]

**Corpo da Requisição (Body):** application/json com os campos a serem atualizados.

----

`DELETE /users/me`
**Descrição:** Permite que o usuário autenticado exclua sua própria conta.

**Autenticação:** [Requer Autenticação]