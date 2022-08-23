const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const yup = require('yup')
const bcrypt = require('bcryptjs')
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

// models
require('../models/Aluno')
const Aluno = mongoose.model('alunos')
require('../models/Professor')
const Professor = mongoose.model('professores')
require('../models/Admin')
const Admin = mongoose.model('admins')



// Páginas de Aluno
router.get('/criarAluno', async (req, res) => {
    res.json('Página para criar aluno')
})

router.post('/criarAluno', async (req, res) => {

    const schema = yup.object().shape({
        nome: yup.string().required('O nome é obrigatório').trim(),
        sobrenome: yup.string().required('O sobrenome é obrigatório').trim(),
        telefone: yup.string().required("required").matches(phoneRegExp, 'O número informado não é válido').min(11, "Número informado é muito curto").max(12, "O número informado é muito longo"),
        endereco: yup.string().required('O endereço é obrigatório'),
        numEndereco: yup.number(),
        dataNasc: yup.date('É necessário que seja uma data').required('A data de nascimento é obrigatória'),
        email: yup.string().email().required('O e-mail é obrigatório').trim(),
        senha1: yup.string().min(8, 'A senha deve conter no mínimo 8 caracteres').required('A senha é obrigatória').trim(),
        senha2: yup.string().oneOf([yup.ref('senha1')], 'As senham devem ser iguais').required('A senha é obrigatória').trim()
    })
    try {
        await schema.validate(req.body)

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.senha1, salt)

        await new Aluno({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            telefone: req.body.telefone,
            endereco: req.body.endereco,
            numEndereco: req.body.numEndereco,
            dataNasc: req.body.dataNasc,
            email: req.body.email,
            senha: hash
        }).save()

        res.json({
            msg: 'Aluno criado com sucesso.',
            dados:
            {
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                telefone: req.body.telefone,
                endereco: req.body.endereco,
                numEndereco: req.body.numEndereco,
                dataNasc: req.body.dataNasc,
                email: req.body.email,
                senha: req.body.senha1
            }
        })
    } catch (err) {
        return res.status(400).json({
            error: true,
            msg: err.errors
        })
    }
})


// Páginas de Professor
router.get('/criarProfessor', async (req, res) => {
    res.json({ msg: 'Página Criar Professor' })
})

router.post('/criarProfessor', async (req, res) => {
    const schema = yup.object().shape({
        nome: yup.string().required('O nome é obrigatório').trim(),
        sobrenome: yup.string().required('O sobrenome é obrigatório').trim(),
        telefone: yup.string().required("required").matches(phoneRegExp, 'O número informado não é válido').min(11, "Número informado é muito curto").max(12, "O número informado é muito longo"),
        endereco: yup.string().required('O endereço é obrigatório'),
        numEndereco: yup.number(),
        dataNasc: yup.date('É necessário que seja uma data').required('A data de nascimento é obrigatória'),
        email: yup.string().email().required('O e-mail é obrigatório').trim(),
        senha1: yup.string().min(8, 'A senha deve conter no mínimo 8 caracteres').required('A senha é obrigatória').trim(),
        senha2: yup.string().oneOf([yup.ref('senha1')], 'As senham devem ser iguais').required('A senha é obrigatória').trim()
    })

    try {
        await schema.validate(req.body)
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.senha1, salt)

        await new Professor({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            telefone: req.body.telefone,
            endereco: req.body.endereco,
            numEndereco: req.body.numEndereco,
            dataNasc: req.body.dataNasc,
            email: req.body.email,
            senha: hash
        }).save()
        res.json({
            msg: 'Professor criado com sucesso.',
            dados:
            {
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                telefone: req.body.telefone,
                endereco: req.body.endereco,
                numEndereco: req.body.numEndereco,
                dataNasc: req.body.dataNasc,
                email: req.body.email,
                senha: req.body.senha1
            }
        })
    } catch (err) {
        return res.status(400).json({
            error: true,
            msg: err.errors
        })
    }
})

// Páginas de Admin

router.get('/criarAdmin', async (req, res) => {
    res.json({ msg: 'Página Criar Admin' })
})

router.post('/criarAdmin', async (req, res) => {
    const schema = yup.object().shape({
        email: yup.string().email().required('O e-mail é obrigatório').trim(),
        senha1: yup.string().min(8, 'A senha deve conter no mínimo 8 caracteres').required('A senha é obrigatória').trim(),
        senha2: yup.string().oneOf([yup.ref('senha1')], 'As senham devem ser iguais').required('A senha é obrigatória').trim()
    })

    try {
        await schema.validate(req.body)
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.senha1, salt)

        await new Admin({
            email: req.body.email,
            senha: hash
        }).save()
        res.json({
            msg: 'Admin criado com sucesso.',
            dados:
            {
                email: req.body.email,
                senha: req.body.senha1
            }
        })
    } catch (err) {
        return res.status(400).json({
            error: true,
            msg: err.errors
        })
    }
})

module.exports = router