const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require('mongoose')
const yup = require('yup')
const jwt = require('jsonwebtoken')
const SECRET = 'passwell'
const bcrypt = require('bcryptjs')

// models
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

// Criar Usuário
router.get('/cadastro', async (req, res) => {
    res.status(200).json({ msg: 'Página de cadastro' })
})

router.post('/cadastrar', async (req, res) => {
    const schema = yup.object().shape({
        nome: yup.string().required('O nome é obrigatório').trim(),
        sobrenome: yup.string().required('O sobrenome é obrigatório').trim(),
        email: yup.string().email().required('O e-mail é obrigatório').trim(),
        senha1: yup.string().min(8, 'A senha deve conter no mínimo 8 caracteres').required('A senha é obrigatória').trim(),
        senha2: yup.string().oneOf([yup.ref('senha1')], 'As senham devem ser iguais').required('A senha é obrigatória').trim(),
    })

    try {
        await schema.validate(req.body)
        console.log(req.body)
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.senha1, salt)

        const novoUsuario = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            senha: hash
        }

        new Usuario(novoUsuario).save().then(() => {
            res.status(200).json({ msg: 'Usuário criado.', dados: req.body })
        }).catch((err) => {
            res.status(400).json({ msg: 'Erro ao criar o usuário.' })
        })

    } catch (err) {
        return res.status(400).json({
            error: true,
            msg: err.errors
        })
    }
})

// Usuário Logar
router.get('/login', async (req, res) => {
    res.json({ msg: 'Página de login' })
})

router.post('/logado', async (req, res) => {
    const User = await Usuario.findOne({ email: req.body.email })

    const schema = yup.object().shape({
        email: yup.string().email('O usuário precisa ser um e-mail.').required('O e-mail é obrigatório').trim(),
        senha: yup.string().required('A senha é obrigatória').trim()
    })

    try {
        await schema.validate(req.body)
        if(User === null) {
            res.status(404).json({msg: 'Usuário não encontrado'})
        } else if (!(await bcrypt.compare(req.body.senha, User.senha))) {
            res.status(401).json({msg: 'Senha incorreta'})
        } else {
            const token = jwt.sign({userId: User._id}, SECRET, {expiresIn: 600})
            res.status(200).json({
                msg: 'Usuário logado com sucesso',
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