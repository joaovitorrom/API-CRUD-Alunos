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
        // Tratamento de erro caso tentativa de criar ra e cpf já existentes no BD
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue);
            res.status(409).json({ error: `O ${field} já está cadastrado.` });
            return;
        }

        res.status(500).json({ error: err });
    }
})

// READ - Consulta de todos alunos cadastrados
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();

        if(students == 0) {
            res.status(404).json({ alert: "Não há nenhum aluno cadastrado." });
            return;
        }

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
            res.status(422).json({ alert: "O aluno não foi encontrado!" });
            return
        }

        res.status(200).json(student);
    } 
    catch (err) {
        res.status(500).json({ error: err });
    }
})

// UPDATE - atualização parcial de dados atráves do ID
router.patch('/:id', async (req, res) => {
    const id  = req.params.id;
    const { name, age, ra, cpf } = req.body;

    const student = {
        name,
        age,
        ra,
        cpf
    };

    try {
        const updatedStudent = await Student.updateOne({ _id: id }, student);

        if(updatedStudent.matchedCount == 0) {
            res.status(422).json({ alert: "O aluno não foi encontrado!" });
            return
        }

        if(updatedStudent.modifiedCount == 0) {
            res.status(422).json({ alert: "Dados já cadastrados." });
            return
        }

        res.status(200).json(student);
    } 
    catch (err) {
        res.status(500).json({ error: err });
    }
})

// DELETE - remover registro de aluno do banco de dados atráves do ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const student = await Student.findOne({ _id: id });
        
    if(!student) {
        res.status(422).json({ alert: "O aluno não foi encontrado!" });
        return
    }

    try {
        await Student.deleteOne({ _id: id });
        res.status(200).json({ message: "Aluno removido com sucesso."});
    } catch(err) {
        res.status(500).json({ error: err});
    }
})

module.exports = router;