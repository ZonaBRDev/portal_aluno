const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Professor = new Schema({
    nome: {
        type: String,
        required: true,
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
    Date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('professores', Professor)