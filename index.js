// Importa o Express
const express = require('express');
const app = express();

// Midleware para ler JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Roda o server
app.listen(3333);
