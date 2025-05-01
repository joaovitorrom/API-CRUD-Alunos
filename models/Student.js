const mongoose = require('mongoose');
const dayjs = require('dayjs');

const Student = mongoose.model('Student', {
    name: String,
    age: Number,
    ra: String,
    cpf: String,
    createdAt: {
        type: String,
        default: () => dayjs().format('DD/MM/YYYY HH:mm:ss')
    },
    updatedAt: {
        type: String,
        default: () => dayjs().format('DD/MM/YYYY HH:mm:ss')
    }
});

module.exports = Student;