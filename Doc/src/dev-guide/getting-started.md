# Guia de Desenvolvimento
[EM CONSTRUÇÃO - AINDA NÃO VALIDADO]

Este guia fornece uma visão geral de como configurar o ambiente de desenvolvimento, rodar o projeto e contribuir com o código.

Requisitos
- Node.js e npm instalados
- Docker e Docker Compose instalados
- AWS CLI configurada (opcional, mas recomendado)
- Acesso ao repositório do projeto

## Configurando o Ambiente
Este passo a passo ajuda você a configurar o ambiente de desenvolvimento local.
No ambiente de desenvolvimento utilizaremos o LocalStack para simular os serviços da AWS.

### Passo 1: Clonar o Repositório
```bash
git clone https://github.com/lucasedson/colaaqui.git
cd colaaqui
```

### Passo 2: Iniciar o LocalStack com Docker Compose
Certifique-se de que o Docker e o Docker Compose estão instalados e funcionando corretamente. Em seguida, inicie o LocalStack com o seguinte comando:
```bash
docker-compose up -d
```

O localstack irá iniciar os serviços simulados da AWS, como S3, DynamoDB, etc. Você pode verificar os logs do LocalStack para garantir que tudo está funcionando corretamente:
```bash
docker-compose logs -f localstack
```

### Passo 3: Configurar o AWS CLI
Se você estiver usando o AWS CLI, configure-o para apontar para o LocalStack. Crie ou edite o arquivo `~/.aws/config` com as seguintes configurações:
```ini
[default]
access_key_id = test
secret_access_key = test
region = us-east-1
output = json
endpoint_url = http://localhost:4566
```

### Passo 4: Criar os recursos no LocalStack via CloudFormation e AWS CLI
Para criar os recursos necessários, você pode usar o arquivo `IAC/dev-template.yaml` com o AWS CLI:
```bash
aws --endpoint-url=http://localhost:4566 cloudformation create-stack --stack-name colaaqui-dev --template-body file://IAC/dev-template.yaml
``` 
Isso criará os buckets S3, tabelas DynamoDB e outros recursos necessários para o ambiente de desenvolvimento. Ainda não criará o Lambda, pois ele será criado posteriormente.

### Passo 5: Instalar as Dependências dos Projetos
Esse projeto utiliza monorepo e é dividido em três partes: Frontend, Backend e Infraestrutura. Cada parte possui suas próprias dependências.
o arquivo `pnpm-workspace.yaml` define as dependências compartilhadas entre os projetos. Para instalar as dependências, execute o seguinte comando na raiz do projeto:
```bash
pnpm install
```

### Passo 6: Configurar o Ambiente de Desenvolvimento
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
```env
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_REGION=us-east-1
LOCALSTACK_HOST=http://localhost:4566
DYNAMODB_TABLE_NAME=colaaqui-dev-table
S3_BUCKET_NAME=colaaqui-dev-bucket

FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
```

Quando estiver em Produção, essas variáveis serão substituídas pelos valores reais e serão gerenciadas pelo AWS Parameter Store/Secrets Manager.

### Passo 7: Rodar o Projeto
Agora que o ambiente está configurado, você pode rodar o projeto. O monorepo utiliza o `pnpm` para gerenciar os scripts de execução. Execute o seguinte comando na raiz do projeto:
```bash
pnpm run dev
```

Isso iniciará o servidor de desenvolvimento para o Frontend e o Backend. Você pode acessar o Frontend em `http://localhost:3000` e o Backend em `http://localhost:3001`.

Caso queira rodar apenas o Frontend ou o Backend, você pode usar os seguintes comandos:
```bash
# Para rodar apenas o Frontend
pnpm run dev:frontend
# Para rodar apenas o Backend
pnpm run dev:backend
```
### Contribuindo com o Código
Após estar com o projeto, você pode contribuir com o código. Sinta-se à vontade para corrigir bugs, adicionar novas funcionalidades ou melhorar a documentação. Antes de começar a trabalhar em uma nova feature ou correção de bug, é recomendável abrir uma issue no repositório para discutir suas ideias e obter feedback da comunidade.

Se você deseja contribuir com o código, siga estas etapas:
1. Crie um fork do repositório.
2. Crie uma branch para sua feature ou correção de bug:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m "Adiciona minha feature"
   ```
4. Envie suas alterações para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request no repositório original.