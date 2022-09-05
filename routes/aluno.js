const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// models
require('../models/Aluno')
const Aluno = mongoose.model('alunos')
require('../models/Turma')
const Turma = mongoose.model('turmas')
require('../models/Aluno_Turma')
const Aluno_Turma = mongoose.model('alunos_turmas')
require('../models/Boletim')
const Boletim = mongoose.model('boletins')

router.get('/', async (req, res) => {
    // const alunoId = '63165dd52f1fed3b47e32358'
    const alunoId = req.userId
    console.log(alunoId)
    Aluno_Turma.findOne({ alunoId: alunoId }).then(async (dados) => {
        if (!dados) {
            res.json({ msg: 'Você ainda não está cadastrado em nenhuma turma!' })
        } else {
            const dadosTurma = await Turma.findOne({ _id: dados.turmaId })
            const dadosBoletim = await Boletim.findOne({alunoId: alunoId})

            res.status(200).json({msg: 'Bem vindo ao seu perfil de Aluno!', nomeTurma: dadosTurma.nome, Boletim: dadosBoletim})
        }
    }).catch((err) => {
        console.log('Erro: ' + err)
    })
})

module.exports = router




