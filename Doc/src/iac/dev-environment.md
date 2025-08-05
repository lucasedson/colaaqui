# Ambiente de Desenvolvimento

Para simular o ambiente da AWS localmente, utilizamos o LocalStack, que nos fornece os serviços de que precisamos (S3, DynamoDB, etc.) dentro de um container Docker.

A definição desses recursos é feita através de um template do AWS CloudFormation, garantindo que nosso ambiente local seja um espelho fiel do que teremos em produção.

### 1. Configurando o LocalStack com Docker Compose
O LocalStack será orquestrado pelo Docker Compose.
Arquivo: `/IAC/dev/docker-compose.yaml`

```yaml
services:
  localstack:
    container_name: localstack
    image: localstack/localstack
    ports: 
      - "127.0.0.1:4566:4566"
    environment:
      - DEBUG=1
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
      - "localstack_data:/var/lib/localstack"

volumes:
  localstack_data:
```

**Para iniciar o LocalStack, execute o seguinte comando:**

```bash
cd IAC/dev && docker-compose up -d
```
Isso irá iniciar, em segundo plano, o LocalStack e os serviços simulados da AWS, como S3, DynamoDB, etc.

#### Template do CloudFormation para Desenvolvimento
Este template define todos os recursos da AWS necessários para a aplicação rodar. Crie este arquivo dentro da sua pasta /IAC.

Arquivo: `IAC/dev-template.yaml`

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: >
  Template de desenvolvimento para o projeto ColaAqui.
  Cria a tabela no DynamoDB e os buckets S3 necessários para a aplicação.

Resources:
  # --- Tabela do DynamoDB para armazenar os metadados dos conteúdos ---
  ContentsTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: "ColaAquiContents"
      AttributeDefinitions:
        - AttributeName: "id"
          AttributeType: "S"
      KeySchema:
        - AttributeName: "id"
          KeyType: "HASH"
      ProvisionedThroughput:
        ReadCapacityUnits: 1
        WriteCapacityUnits: 1
      TimeToLiveSpecification:
        AttributeName: "expiresAt"
        Enabled: true

  # --- Bucket S3 para hospedar o frontend estático (React/Vite) ---
  FrontendBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: "colaaqui-frontend-bucket"
      AccessControl: PublicRead # Permite que o conteúdo seja lido publicamente
      WebsiteConfiguration:
        IndexDocument: "index.html"
        ErrorDocument: "index.html" # Essencial para o roteamento de SPAs (React Router)

  # Política para tornar o bucket do frontend publicamente acessível
  FrontendBucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket: !Ref FrontendBucket
      PolicyDocument:
        Statement:
          - Sid: PublicReadGetObject
            Effect: Allow
            Principal: "*"
            Action: "s3:GetObject"
            Resource: !Join ["", ["arn:aws:s3:::", !Ref FrontendBucket, "/*"]]

  # --- Bucket S3 para armazenar os arquivos de conteúdo (pastes) ---
  StorageBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: "colaaqui-storage-bucket"
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true

Outputs:
  ContentsTableName:
    Value: !Ref ContentsTable
    Description: "Nome da tabela DynamoDB"
  FrontendBucketName:
    Value: !Ref FrontendBucket
    Description: "Nome do bucket S3 para o frontend"
  StorageBucketName:
    Value: !Ref StorageBucket
    Description: "Nome do bucket S3 para armazenamento de conteúdo"
```

### 3. Aplicando o Template no LocalStack
Para que o LocalStack crie os recursos definidos no dev-template.yaml, você precisará do AWS CLI instalado. O comando a seguir diz para o AWS CLI se comunicar com o nosso LocalStack em vez da AWS real.

Execute este comando na raiz do projeto via bash:

```bash
aws --endpoint-url=http://localhost:4566 cloudformation create-stack \
  --stack-name colaaqui-dev-stack \
  --template-body file://IAC/dev-template.yaml
```

Alternativamente, use o `pnpm run iac:dev` para executar o comando acima.

**O LocalStack irá criar os recursos da AWS, conforme definido no template.**

----

**Para verificar se os recursos foram criados:**

**Listar buckets S3:**

```Bash
aws --endpoint-url=http://localhost:4566 s3 ls
```
Saída esperada:

```
2025-08-05 12:50:00 colaaqui-frontend-bucket
2025-08-05 12:50:00 colaaqui-storage-bucket
```
**Listar tabelas DynamoDB:**


```Bash
aws --endpoint-url=http://localhost:4566 dynamodb list-tables
```
Saída esperada:

```JSON

{
  "TableNames": [
    "ColaAquiContents"
  ]
}
```
Com isso, seu ambiente de desenvolvimento local está configurado e documentado! Qualquer desenvolvedor que entrar no projeto pode seguir estes passos para ter uma réplica funcional da infraestrutura da AWS rodando em sua própria máquina.