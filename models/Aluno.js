const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Aluno = new Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    telefone: {
        type: Number,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    numEndereco: {
        type: Number
    },
    dataNasc: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    permissao: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('alunos', Aluno)