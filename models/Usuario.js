const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    senha: {
        type: String,
        required: true,
    }, 
    permissao: {
        type: Number,
        default: 0
    },
    Data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('usuarios', Usuario)