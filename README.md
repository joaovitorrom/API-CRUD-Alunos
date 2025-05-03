# API CRUD Alunos

API RESTful simples de cadastro, consulta, atualização e remoção de alunos - desenvolvida em Node.js, com JavaScript - durante a capacitação trainee back‑end da Unect Jr. Utiliza as dependências: Express, Mongoose (MongoDB), Day.js para timestamps e Swagger para documentação interativa.

---

## 📋 Sumário

1. [Descrição](#descri%C3%A7%C3%A3o)
2. [Pré‑requisitos](#pr%C3%A9-requisitos)
3. [Instalação](#instala%C3%A7%C3%A3o)
4. [Variáveis de Ambiente](#vari%C3%A1veis-de-ambiente)
5. [Execução](#execu%C3%A7%C3%A3o)
6. [Documentação (Swagger)](#documenta%C3%A7%C3%A3o-swagger)
7. [Endpoints Disponíveis](#endpoints-dispon%C3%ADveis)
8. [Exemplos de Requisição](#exemplos-de-requisi%C3%A7%C3%A3o)
9. [Licença](#licen%C3%A7a)

---

## Descrição

Esta API implementa as operações CRUD (Create, Read, Update, Delete) para um recurso **Aluno**, armazenando dados no MongoDB. Cada aluno possui:

* **\_id**: gerado pelo MongoDB
* **name** (string)
* **age** (number)
* **ra** (string, único)
* **cpf** (string, único)
* **createdAt** (string, timestamp formatado)
* **updatedAt** (string, timestamp formatado)

Foi utilizada a biblioteca **Day.js** para formatação de datas e **Swagger UI** para documentação interativa.

---

## Pré‑requisitos

* Node.js v14+ instalado
* MongoDB (local ou MongoDB Atlas)

---

## Instalação

1. Clone este repositório:

   ```bash
   git clone <URL-do-repositório>
   cd api-crud-alunos
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz com as seguintes chaves:

```dotenv
DB_USER=<seu-usuário-do-atlas-ou-local>
DB_PASSWORD=<sua-senha-codificada>
```

Exemplo:

```dotenv
DB_USER=usuario123
DB_PASSWORD=p%40ssw0rd
```

---

## Execução

Inicie o servidor em modo de desenvolvimento (com **nodemon**):

```bash
npm start
```

Por padrão ele roda em `http://localhost:3333/`.

---

## Documentação (Swagger)

Uma interface interativa está disponível em:

```
http://localhost:3333/api-docs
```

Lá você pode visualizar todos os endpoints, parâmetros e testar as requisições diretamente no browser.

---

## Endpoints Disponíveis

Base URL: `http://localhost:3333`

### POST /students

* Cria um novo aluno.
* **Body JSON**:

  ```json
  {
    "name": "string",
    "age": number,
    "ra": "string",
    "cpf": "string"
  }
  ```
* **Respostas**:

  * `201 Created`: aluno criado, retorna `{ message, data }`
  * `409 Conflict`: `ra` ou `cpf` já cadastrado
  * `422 Unprocessable Entity`: campos obrigatórios faltando

### GET /students

* Lista todos os alunos, opcionalmente filtrados.
* **Query Params**:

  * `ra` — busca exata por RA
  * `name` — busca parcial por nome (case‑insensitive)
* **Respostas**:

  * `200 OK`: retorna `{ data: [...], count: total }`

### GET /students/\:id

* Busca um aluno pelo ID (MongoDB ObjectId).
* **Respostas**:

  * `200 OK`: retorna `{ data }`
  * `404 Not Found`: aluno não encontrado

### PATCH /students/\:id

* Atualização parcial de um aluno.
* **Body JSON**: qualquer combinação de `name`, `age`, `ra`, `cpf`
* **Respostas**:

  * `200 OK`: retorna `{ message, data }` ou `{ message: "Nenhuma alteração..." }`
  * `404 Not Found`: aluno não encontrado
  * `409 Conflict`: `ra` ou `cpf` em uso

### DELETE /students/\:id

* Remove um aluno pelo ID.
* **Respostas**:

  * `200 OK`: `{ message: "Aluno removido com sucesso." }`
  * `404 Not Found`: aluno não encontrado

---

## Exemplos de Requisição

Usando **curl**:

```bash
curl -X POST \
  http://localhost:3333/students \
  -H 'Content-Type: application/json' \
  -d '{ "name": "Somebody", "age": 22, "ra": "a26522", "cpf": "785.625.431-98" }'
```

---

## Licença

ISC © 2025
