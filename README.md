# Teste para a vaga de desenvolvedor Full Stack

## Descrição

Este projeto é uma aplicação Full Stack desenvolvida como parte do processo seletivo para a vaga de desenvolvedor Full Stack. A aplicação é composta por um backend construído com Node.js,TypeScript, e um frontend construído com React, JavaScript.

### Backend

O backend desta aplicação segue as melhores práticas de desenvolvimento, com uma arquitetura limpa e bem estruturada. Ele encapsula a lógica em várias camadas, incluindo rotas, controladores, negócios e banco de dados, o que facilita a manutenção e a escalabilidade do código.

#### Tecnologias utilizadas

- Node.js versão 18.18.2
- Express: versão 4.18.3
- Knex: versão 3.1.0
- Jest: versão 29.7.0
- TypeScript: versão 5.3.3
- Cors: versão 2.8.5
- Dotenv: versão 16.4.5
- pg-promise: versão 11.5.4
- ts-node-dev: versão 2.0.0

#### Recursos

- Paginação: Permite carregar os dados em partes, melhorando a performance e a experiência do usuário.
- DTOs (Data Transfer Objects): Garante que os objetos tenham exatamente os campos que o cliente espera receber.
- Tratamento de erros: Cada erro é capturado e tratado de forma adequada, proporcionando feedbacks claros para o usuário.
- Testes: O código é coberto por testes, garantindo que ele funcione como esperado.

Test Coverage:
!Coverage Report[https://github.com/gustavojb1/teste-fullStack/issues/12#issue-2174263259]

### Frontend

O frontend desta aplicação foi construído com React, uma biblioteca JavaScript popular para construção de interfaces de usuário. Ele utiliza o Vite como ferramenta de build, proporcionando um ambiente de desenvolvimento rápido e eficiente.

#### Tecnologias utilizadas

- React: versão 18.2.0
- React-DOM: versão 18.2.0
- Axios: versão 1.6.7
- Styled-components: versão 6.1.8
- PropTypes: versão 15.8.1
- Dotenv: versão 16.4.5
- Vite: versão 5.1.4

#### Recursos

- Styled-components: Esta biblioteca permite escrever CSS real em JavaScript, o que ajuda a manter os estilos vinculados aos componentes, melhorando a manutenção e a escalabilidade do código. Optei por usar styled-components para mostrar minhas habilidades com CSS sem depender de componentes prontos de bibliotecas externas.

## Instalação

Siga os passos abaixo para instalar e executar o projeto localmente:

1. **Clone o repositório**: Primeiro, você precisa clonar o repositório do GitHub para a sua máquina local. Você pode fazer isso com o seguinte comando:
```bash
git clone https://github.com/gustavojb1/teste-fullStack.git
```

2. Navegue até o diretório do projeto: Use o comando cd para navegar até o diretório do projeto:
```bash
cd teste-fullStack
```
3. o arquivo ddl.sql encontra-se na raiz como solicitado no teste porém encontra-se também a querys necessárias para criação do banco de dados no arquivo DB.sql também na raiz

Query:
```bash
CREATE DATABASE teste_fullStack;

\c teste_fullStack;

CREATE SCHEMA IF NOT EXISTS clients
    AUTHORIZATION postgres;

CREATE TABLE clients.clients (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(15),
    x NUMERIC,
    y NUMERIC
);
```
obs.: a tabela client precisa estar dentro do schema clients

5. Corrija o arquivo .env dentro da pasta "teste-fullStack/backend" com seus dados do banco de dados PostgreSQL
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres123
DB_NAME=teste_fullstack
```

6. Instale as dependências do backend: Navegue até o diretório /backend e instale as dependências com o comando npm install:
```bash
cd backend
npm install
```

7. Inicie o servidor do backend: Inicie o servidor do backend com o comando npm start:
```bash
npm start
```
certifique que a porta 3003 esteja livre, caso não seja possível altere a porta no .env no diretório /backend
```bash
SERVER_PORT=3003
```
caso altere a SERVER_PORT precisará alterar tambem no .env na pasta /frontend a variável VITE_SERVER_PORT
```bash
VITE_SERVER_HOST=localhost
VITE_SERVER_PORT=3003
```

8. Instale as dependências do frontend: Em um novo terminal, navegue até o diretório /frontend e instale as dependências com o comando npm install:
```bash
cd ../frontend
npm install
```

9. Inicie o servidor do frontend: Inicie o servidor do frontend com o comando npm start:
```bash
npm start
```
geralmente o vite irá emular na porta  http://localhost:5173/ mas será mostrado no terminal
