const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const yup = require('yup')

// models
require('../models/Aluno')
const Aluno = mongoose.model('alunos')

router.get('/criarAluno', async (req, res) => {
    res.json('Página para criar aluno')
})

router.post('/criarAluno', async (req, res) => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const schema = yup.object().shape({
        nome: yup.string().required('O nome é obrigatório').trim(),
        sobrenome: yup.string().required('O sobrenome é obrigatório').trim(),
        telefone: yup.string().required("required").matches(phoneRegExp, 'O número informado não é válido').min(11, "Número informado é muito curto").max(12, "O número informado é muito longo"),
        endereco: yup.string().required('O endereço é obrigatório'),
        numEndereco: yup.number(),
        dataNasc: yup.date('A data de nascimento deve ser uma data').required('A data de nascimento é obrigatória')
    })
    try {
        await schema.validate(req.body)

        const novoAluno = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            telefone: req.body.telefone,
            endereco: req.body.endereco,
            numEndereco: req.body.numEndereco,
            dataNasc: req.body.dataNasc
        }

        new Aluno(novoAluno).save().then(() => {
            res.status(200).json({ msg: 'Aluno criado com sucesso' })
        }).catch((err) => {
            res.status(400).json({ msg: 'Não foi possível criar o usuário. ' + err })
        })

        // console.log(req.body)
    } catch (err) {
        return res.status(400).json({
            error: true,
            msg: err.errors
        })
    }
})
module.exports = router