const mongoose = require('mongoose');
const dayjs = require('dayjs');

const Student = mongoose.model('Student', {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    ra: { type: String, required: true, unique: true },
    cpf: { type: String, required: true, unique: true },
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