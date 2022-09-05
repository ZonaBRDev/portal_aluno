const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const verifyJWT = require('./verifyJWT')
const PORT = process.env.PORT || 5554
const app = express()

// Import Routes
const login = require('./routes/login')
const prof = require('./routes/prof')
const admin = require ('./routes/admin')
const aluno = require ('./routes/aluno')

// Import Permissions
const eProf = require('./permissions/eProf')
const eAluno = require('./permissions/eAluno')
const eAdmin = require('./permissions/eAdmin')

// Configs
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Public
app.use(express.static(path.join(__dirname + '/public')))

// Mongoose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/portalaluno', async () => {
    try {
        console.log("Conectado ao mongo")
    } catch (err) {
        console.log('Erro ao conectar no banco: ' + err)
    }
})

// Routes
app.get('/', (req, res) => {
    res.json('Login Page')
})
app.use(login)
app.use('/prof', prof)
app.use('/admin', admin)
app.use('/aluno', verifyJWT, eAluno, aluno)

// Server
app.listen(PORT, () => {
    console.log('Servidor rodando na URL: http://localhost:5554/')
})