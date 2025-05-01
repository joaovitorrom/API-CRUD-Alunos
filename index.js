// Configuracao Inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Midleware para ler JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Roda o server
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@crud-alunos.og8ztxw.mongodb.net/?retryWrites=true&w=majority&appName=CRUD-Alunos`
    )
    .then(() => {
        app.listen(3333);
        console.log("Conectado ao MongoDB!");
    })
    .catch((err)=>console.log(err));

 