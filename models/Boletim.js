const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Boletim = new Schema({
    nota1: {
        type: mongoose.Types.Decimal128,
        default: null
    },
    nota2: {
        type: mongoose.Types.Decimal128,
        default: null
    },
    nota3: {
        type: mongoose.Types.Decimal128,
        default: null
    },
    nota4: {
        type: mongoose.Types.Decimal128,
        default: null
    },
    alunoId: {
        type: Schema.Types.ObjectId,
        ref: 'alunos',
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('boletins', Boletim)