const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const verifyJWT = require('./verifyJWT')
const PORT = process.env.PORT || 5554
const app = express()

// Imports
const login = require('./routes/login')

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
    res.sendFile(__dirname+'/views/geral/index.html')
})
app.use(login)



// Server
app.listen(PORT, () => {
    console.log('Servdor rodando na URL: http://localhost:5554/')
})