const router = require('express').Router();

// Importando Model
const Student = require('../models/Student');

// CREATE - Cadastro de aluno
router.post('/', async (req, res) => {
    const { name, age, ra, cpf } = req.body;

   if (!name || !age || !ra || !cpf) {
        res.status(422).json({ error: 'Todos os campos (name, age, ra, cpf) são obrigatórios.' })
        return;
    }

    const student = {
        name,
        age,
        ra,
        cpf
    };

    try {
        const newStudent = await Student.create(student);
        res.status(201).json({
            message: "Aluno cadastrado com sucesso!",
            data: newStudent
        });
    } 
    catch (err) {
        // Tratamento de erro caso haja tentativa de criar ra e cpf já existentes no BD
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue);
            res.status(409).json({ error: `O ${field} já está cadastrado.` });
            return;
        }

        res.status(500).json({ error: 'Erro interno ao cadastrar aluno.', details: err.message });
    }
})

// READ ALL - Consulta de todos alunos cadastrados
router.get('/', async (req, res) => {
    const query = req.query;

    try {
        const students = await Student.find(query);
        res.status(200).json({
            data: students,
            count: students.length
        });
    } 
    catch (err) {
        res.status(500).json({ error: 'Erro interno ao buscar alunos.', details: err.message });       
    }
})

// READ ONE - Consulta de um aluno cadastrado através do ID
router.get('/:id', async (req, res) => {
    const id  = req.params.id;

    try {
        const student = await Student.findOne({ _id: id });
        
        if(!student) {
            res.status(404).json({ error: "O aluno não foi encontrado!" });
            return;
        }

        res.status(200).json({ data: student });
    } 
    catch (err) {
        res.status(500).json({ error: 'Erro interno ao buscar alunos.', details: err.message });
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
            res.status(404).json({ error: "O aluno não foi encontrado!" });
            return;
        }

        if(updatedStudent.modifiedCount == 0) {
            res.status(200).json({ message: "Nenhuma alteração detectada, dados já cadastrados." });
            return;
        }

        res.status(200).json({
            message: 'Aluno atualizado com sucesso.',
            data: student
        });
    } 
    catch (err) {
        // Tratamento de erro caso haja tentativa de atualizar ra e cpf com dados já existentes no BD
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue);
            res.status(409).json({ error: `O ${field} já está cadastrado.` });
            return;
        }

        res.status(500).json({ error: 'Erro interno ao atualizar aluno.', details: err.message });
    }
})

// DELETE - remover registro de aluno do banco de dados atráves do ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const student = await Student.findOne({ _id: id });
        
    if(!student) {
        res.status(404).json({ error: "O aluno não foi encontrado!" });
        return
    }

    try {
        await Student.deleteOne({ _id: id });
        res.status(200).json({ message: "Aluno removido com sucesso."});
    } 
    catch(err) {
        res.status(500).json({ error: 'Erro interno ao remover aluno.', details: err.message });
    }
})

module.exports = router;