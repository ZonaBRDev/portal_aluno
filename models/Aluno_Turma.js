const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Aluno_Turma = Schema({
    alunoId: {
        type: Schema.Types.ObjectId,
        ref: 'alunos',
        required: true
    },
    turmaId: {
        type: Schema.Types.ObjectId,
        ref: 'turmas',
        required: true
    }
})

mongoose.model('alunos_turmas', Aluno_Turma)