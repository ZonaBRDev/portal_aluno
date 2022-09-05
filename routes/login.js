const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require('mongoose')
const yup = require('yup')
const jwt = require('jsonwebtoken')
const SECRET = 'passwell'
const bcrypt = require('bcryptjs')

// models
require('../models/Aluno')
const Aluno = mongoose.model('alunos')
require('../models/Professor')
const Professor = mongoose.model('professores')
require('../models/Admin')
const Admin = mongoose.model('admins')

// Login Aluno
router.get('/loginAluno', async (req, res) => {
    res.json({ msg: 'Página de login para Alunos' })
})

router.post('/loginAluno', async (req, res) => {
    const User = await Aluno.findOne({ email: req.body.email })

    const schema = yup.object().shape({
        email: yup.string().email('O usuário precisa ser um e-mail.').required('O e-mail é obrigatório').trim(),
        senha: yup.string().required('A senha é obrigatória').trim()
    })

    try {
        await schema.validate(req.body)
        if (User === null) {
            res.status(404).json({ msg: 'Usuário não encontrado' })
        } else if (!(await bcrypt.compare(req.body.senha, User.senha))) {
            res.status(401).json({ msg: 'Senha incorreta' })
        } else {
            // const token = jwt.sign({ userId: User._id }, SECRET, { expiresIn: 600 })
            const token = jwt.sign({ userId: User._id }, SECRET, {expiresIn: 999999999})
            res.status(200).json({
                msg: 'Aluno logado com sucesso',
                token: token
            })
        }
    } catch (err) {
        return res.status(400).json({
            msg: err.errors
        })
    }
})

// Login Professor
router.get('/loginProfessor', async (req, res) => {
    res.json({ msg: 'Página de login para Professores' })
})

router.post('/loginProfessor', async (req, res) => {
    const User = await Professor.findOne({ email: req.body.email })

    const schema = yup.object().shape({
        email: yup.string().email('O usuário precisa ser um e-mail.').required('O e-mail é obrigatório').trim(),
        senha: yup.string().required('A senha é obrigatória').trim()
    })

    try {
        await schema.validate(req.body)
        if (User === null) {
            res.status(404).json({ msg: 'Usuário não encontrado' })
        } else if (!(await bcrypt.compare(req.body.senha, User.senha))) {
            res.status(401).json({ msg: 'Senha incorreta' })
        } else {
            const token = jwt.sign({ userId: User._id }, SECRET, { expiresIn: 600 })
            res.status(200).json({
                msg: 'Professor logado com sucesso',
                token: token
            })
        }
    } catch (err) {
        return res.status(400).json({
            msg: err.errors
        })
    }
})

// Login Admin

router.get('/loginAdmin', async (req, res) => {
    res.json({ msg: 'Página de login para Admins' })
})

router.post('/loginAdmin', async (req, res) => {
    const User = await Admin.findOne({ email: req.body.email })

    const schema = yup.object().shape({
        email: yup.string().email('O usuário precisa ser um e-mail').required('O e-mail é obrigatório').trim(),
        senha: yup.string().required('A senha é obrigatória').trim()
    })

    try {
        await schema.validate(req.body)

        if (User === null) {
            res.status(404).json({ msg: 'Usuário não encontrado' })
        } else if (!(await bcrypt.compare(req.body.senha, User.senha))) {
            res.status(401).json({ msg: 'Senha incorreta' })
        } else {
            const token = jwt.sign({ userId: User._id }, SECRET, { expiresIn: 600 })
            res.status(200).json({
                msg: 'ADM logado com sucesso',
                token: token
            })
        }
    } catch (err) {
        return res.status(400).json({
            msg: err.errors
        })
    }
})
module.exports = router