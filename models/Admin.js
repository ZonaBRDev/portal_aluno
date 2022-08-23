const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Admin = new Schema ({
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
        default: 2
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('admins', Admin)