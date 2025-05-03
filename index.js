// Configuracao Inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();

// Midleware para ler urlencoded e JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Rotas da API
const studentRoutes = require('./routes/studentRoutes');
app.use('/students', studentRoutes);

// Carrega o swagger.yaml
const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'swagger.yaml'));

// Rota de documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Conecta com MongoDB e roda o servidor
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@crud-alunos.og8ztxw.mongodb.net/Banco-Alunos?retryWrites=true&w=majority&appName=CRUD-Alunos`
    )
    .then(() => {
        app.listen(3333);
        console.log("Conectado ao MongoDB!");
    })
    .catch((err)=>console.log(err));

 