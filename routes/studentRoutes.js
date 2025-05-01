const router = require('express').Router();

// Importando Model
const Student = require('../models/Student');

// Cadastro de aluno
router.post('/', async (req, res) => {
    const { name, age, ra, cpf } = req.body;

    if(!name) {
        res.status(422).json({error: "O nome do aluno é obrigatório!"});
        return;
    }

    if(!ra) {
        res.status(422).json({error: "O ra do aluno é obrigatório!"});
        return;
    }

    if(!cpf) {
        res.status(422).json({error: "O cpf do aluno é obrigatório!"});
        return;
    }

    const student = {
        name,
        age,
        ra,
        cpf
    };

    try {
        await Student.create(student);
        res.status(201).json({ message: "Aluno cadastrado com sucesso!" });
    } 
    catch (err) {
        res.status(500).json({ error: err });
    }
})

// Consulta de todos alunos cadastrados
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } 
    catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;