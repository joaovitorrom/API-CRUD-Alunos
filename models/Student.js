const mongoose = require('mongoose');
const dayjs = require('dayjs');

const studentSchema = new mongoose.Schema({
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

// Middleware do Moongose para atualizar o atributo updatedAt
studentSchema.pre('updateOne', function (next) {
    this._update.updatedAt = dayjs().format('DD/MM/YYYY HH:mm:ss');
    next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;