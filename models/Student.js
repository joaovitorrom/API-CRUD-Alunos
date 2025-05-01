const mongoose = require('mongoose');

const Student = mongoose.model('Aluno', {
    name: String,
    age: Number,
    ra: String,
    cpf: String,
    createdAt: String,
    updatedAt: String
});

module.exports = Student;