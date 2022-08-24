const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Turma = new Schema ({
    nome: {
        type: String,
        required: true
    }, 
    professor: {
        type: Schema.Types.ObjectId,
        ref: 'professores',
        required: true
    }
})

mongoose.model('turmas', Turma)