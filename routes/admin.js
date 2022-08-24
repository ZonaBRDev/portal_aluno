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
require('../models/Turma')
const Turma = mongoose.model('turmas')
require('../models/Aluno_Turma')
const Aluno_Turma = mongoose.model('alunos_turmas')


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

// Criar Turma

router.get('/criarTurma', async (req, res) => {
    res.status(200).json({ msg: 'Página para Criar Turma' })
})

router.post('/criarTurma', async (req, res) => {
    const schema = yup.object().shape({
        nome: yup.string().required('O nome da turma é obrigatório').trim(),
        professor: yup.string().required('O nome do professor é obrigatório')
    })

    try {
        await schema.validate(req.body)

        const dadosProfessor = await Professor.findOne({ nome: req.body.professor })

        if (dadosProfessor == null) {
            res.status(400).json({ msg: 'O professor selecionado não está cadastrado' })
        } else {
            await new Turma({
                nome: req.body.nome,
                professor: dadosProfessor._id
            }).save()
            res.status(200).json({
                msg: 'Turma criada com sucesso',
                dados:
                {
                    id: dadosProfessor._id,
                    nome: req.body.nome,
                    professor: req.body.professor
                }
            })
        }
    } catch (err) {
        return res.json({
            msg: err.errors
        })
    }
})

// Inserir Alunos em uma Turma

router.get('/inserirAluno', async (req, res) => {
    res.json({ msg: 'Página para inserir alunos em uma turma' })
})

router.post('/inserirAluno', async (req, res) => {
    const schema = yup.object().shape({
        nomeAluno: yup.string().required('Informar o aluno é obrigatório'),
        nomeTurma: yup.string().required('Informar a turma é obrigatório')
    })

    try {
        await schema.validate(req.body)

        const dadosAluno = await Aluno.findOne({ nome: req.body.nomeAluno })
        const dadosTurma = await Turma.findOne({ nome: req.body.nomeTurma })

        if (dadosAluno == null) {
            res.status(400).json({ msg: 'O aluno informado não está cadastrado' })
        } else if (dadosTurma == null) {
            res.status(400).json({ msg: 'A turma informada não está cadastrada' })
        } else {

            const dadosAluno_Turma = await Aluno_Turma.findOne({ alunoId: dadosAluno._id })

            if (!dadosAluno_Turma) {
                await new Aluno_Turma({
                    alunoId: dadosAluno._id,
                    turmaId: dadosTurma._id
                }).save()
                res.status(200).json({
                    msg: 'Aluno inserido com sucesso',
                    nomeAluno: req.body.nomeAluno,
                    alunoId: dadosAluno._id,
                    nomeTurma: req.body.nomeTurma,
                    TurmaId: dadosTurma._id,
                })
            } else {
                const nomeTurma = await Turma.findOne({ _id: dadosAluno_Turma.turmaId})
                res.status(400).json({
                    msg: `O aluno já está cadastrado na turma: ${nomeTurma.nome}`
                })
            }
        }
    } catch (err) {
        return res.status(400).json({
            msg: err.errors
        })
    }
})





module.exports = router