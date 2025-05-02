const router = require('express').Router();

// Importando Model
const Student = require('../models/Student');

// CREATE - Cadastro de aluno
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

// READ - Consulta de todos alunos cadastrados
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } 
    catch (err) {
        res.status(500).json({ error: err });
    }
})

// READ - Consulta de um aluno cadastrado através do ID
router.get('/:id', async (req, res) => {
    const id  = req.params.id;

    try {
        const student = await Student.findOne({ _id: id });
        
        if(!student) {
            res.status(422).json({ alert: "O Aluno não encontrado!" });
            return
        }

        res.status(200).json(student);
    } 
    catch (err) {
        res.status(500).json({ error: err });
    }
})


module.exports = router;