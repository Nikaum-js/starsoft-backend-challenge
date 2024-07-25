# DEPLOY.md

## Pré-requisitos

1. **Docker**: Certifique-se de que o Docker está instalado na máquina de destino.
2. **Docker Compose**: Certifique-se de que o Docker Compose está instalado na máquina de destino.
3. **Node.js e Yarn**: Certifique-se de que o Node.js e o Yarn estão instalados na máquina de destino.
4. **Ambiente**: Configure as variáveis de ambiente necessárias.

## Passos para Deploy

### 1. Clonar o Repositório

Clone o repositório do projeto para a máquina de destino:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo \`.env\` na raiz do projeto e adicione as variáveis de ambiente necessárias:

```
DB_HOST=dpg-cqgq70ks1f4s73be5m80-a.oregon-postgres.render.com
DB_PORT=5432
DB_USERNAME=starsoft_backend_challenge_user
DB_PASSWORD=sVy96LUmTaToKhsYJ865zmGrxnvfnc4S
DB_DATABASE=starsoft_backend_challenge

REDIS_HOST=close-dolphin-55482.upstash.io
REDIS_PORT=6379
REDIS_PASSWORD=Adi6AAIjcDFiYzVhNDkwM2E4YmQ0MjJiOWU4N2VjN2FiM2Y4N2Y4OHAxMA

KAFKA_BROKER_URL=relaxed-oryx-5118-us1-kafka.upstash.io:9092
KAFKA_CLIENT_ID=nestjs-client
KAFKA_USERNAME=cmVsYXhlZC1vcnl4LTUxMTgkV-RknG7FBFp4igg87YxYe_Qmgnb5TShbPVz-LPw
KAFKA_PASSWORD=ZGU4YWE2NGEtNzRlMS00YzE2LTkzOTUtMGU4N2MxMmZhM2Fl
KAFKAJS_NO_PARTITIONER_WARNING=1
```

### 3. Configurar Docker Compose

Certifique-se de que o arquivo \`docker-compose.yml\` está configurado corretamente. Aqui está um exemplo de configuração:

```yaml
version: '3'
services:
  postgres:
    image: postgres:13
    restart: always
    environment:
      POSTGRES_USER: starsoft_backend_challenge_db_user
      POSTGRES_PASSWORD: BgbsQ55kXuUhTmxA8XXsnYpYPDNg17qm
      POSTGRES_DB: starsoft_backend_challenge_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:latest
    ports:
      - "6380:6379"  # Change the host port here
    environment:
      - REDIS_PASSWORD=Adi6AAIjcDFiYzVhNDkwM2E4YmQ0MjJiOWU4N2VjN2FiM2Y4N2Y4OHAxMA
    command: ["redis-server", "--requirepass", "\$REDIS_PASSWORD"]

  zookeeper:
    image: confluentinc/cp-zookeeper:7.2.1
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - "2181:2181"

  kafka:
    image: confluentinc/cp-kafka:7.2.1
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    depends_on:
      - zookeeper

volumes:
  postgres_data:
```

### 4. Construir e Inicializar os Contêineres Docker

Construa e inicie os contêineres Docker usando o Docker Compose:

```bash
docker-compose up --build
```

### 5. Instalar Dependências

Instale as dependências do projeto:

```bash
yarn install
```

### 6. Construir a Aplicação

Construa a aplicação para produção:

```bash
yarn build
```

### 7. Iniciar a Aplicação

Inicie a aplicação:

```bash
yarn start:prod
```

### 8. Verificar a Aplicação

Acesse a aplicação no navegador:

```
http://localhost:3000
```

A documentação Swagger estará disponível em:

```
http://localhost:3000/api
```

### 9. Executar Testes (Opcional)

Para garantir que tudo está funcionando corretamente, execute os testes:

```bash
yarn test
```

## Problemas Comuns

- **Erro de Conexão com o Banco de Dados**: Verifique se as variáveis de ambiente do banco de dados estão corretas e se o serviço do banco de dados está rodando.
- **Erro de Conexão com o Redis**: Verifique se as variáveis de ambiente do Redis estão corretas e se o serviço do Redis está rodando.
- **Erro de Conexão com o Kafka**: Verifique se as variáveis de ambiente do Kafka estão corretas e se o serviço do Kafka está rodando.
`;
