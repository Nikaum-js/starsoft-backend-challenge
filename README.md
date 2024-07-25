# Starsoft Backend Challenge

Este repositório contém o código para o desafio de backend da Starsoft. A aplicação é construída utilizando Nest.js e Yarn como gerenciador de pacotes. Este guia fornece instruções sobre como configurar, rodar e fazer o deploy do projeto.

## Índice

- [Starsoft Backend Challenge](#starsoft-backend-challenge)
  - [Índice](#índice)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Scripts Disponíveis](#scripts-disponíveis)
    - [`yarn dev`](#yarn-dev)
    - [`yarn build`](#yarn-build)
    - [`yarn start:prod`](#yarn-startprod)
    - [`yarn lint`](#yarn-lint)
  - [Docker](#docker)
    - [Passos para rodar com Docker](#passos-para-rodar-com-docker)
  - [Testes](#testes)
    - [Executar testes unitários e de integração](#executar-testes-unitários-e-de-integração)
  - [Deploy](#deploy)

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

- Node.js (versão 18.x ou superior)
- Yarn (versão 1.x ou superior)
- Docker
- Docker Compose

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Nikaum-js/starsoft-backend-challenge
   cd starsoft-backend-challenge
   ```

2. **Instale as dependências:**

   ```bash
   yarn install
   ```

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

### `yarn dev`

Executa a aplicação em modo de desenvolvimento.
Abra [http://localhost:3000](http://localhost:3000) para ver no navegador.

A página será recarregada se você fizer edições.
Você também verá erros de lint no console.

```bash
yarn dev
```

### `yarn build`

Constrói a aplicação para produção na pasta `dist`.
A aplicação está pronta para ser implantada!

```bash
yarn build
```

### \`yarn start:prod\`

Inicia o servidor em modo de produção.
Certifique-se de que você executou `yarn build` primeiro.

```bash
yarn start:prod
```

### `yarn lint`

Executa o linter para verificar o código em busca de problemas de formatação e estilo.

```bash
yarn lint
```

## Docker

Também é possível rodar a aplicação utilizando Docker. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

### Passos para rodar com Docker

1. **Construa a imagem Docker:**

   ```bash
   docker-compose up --build
   ```

2. **Acesse a aplicação:**

   Abra [http://localhost:3000](http://localhost:3000) para ver no navegador.

## Testes

O projeto utiliza Jest para testes unitários e de integração.

### Executar testes unitários e de integração

Para executar os testes, utilize o comando:

```bash
yarn test
```

Para executar os testes em modo watch durante o desenvolvimento, utilize o comando:

```bash
yarn test:watch
```

## Deploy

Para fazer o deploy da aplicação, siga as instruções no arquivo [DEPLOY.md](./DEPLOY.md).
