const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const SECRET = 'passwell'
const jwt = require("jsonwebtoken")

// models
require('../models/Professor')
const Professor = mongoose.model('professores')
require('../models/Turma')
const Turma = mongoose.model('turmas')
require('../models/Aluno_Turma')
const Aluno_Turma = mongoose.model('alunos_turmas')
require('../models/Aluno')
const Aluno = mongoose.model('alunos')

router.get('/', async (req, res) => {
    res.json('Página inicial professor')
})

router.get('/turmas', async (req, res) => {
    const profid = req.userId
    // const profid = '63068b742cf10de021b30882'
    const turmas = await Turma.find({ professor: profid }, { '_id': 1, 'nome': 1 })
    console.log(profid)
    if (turmas == '') {
        res.json({ msg: 'Você não está cadastrado em nenhuma turma!' })
    } else {
        res.status(200).json({ msg: 'Suas Turmas:', turmas })
    }
})

router.get('/turmas/alunos/:id', async (req, res) => {
    const turmaId = req.params.id
    const dadosAluno_Turma = await Aluno_Turma.find({ turmaId: turmaId }, { '_id': 0, 'alunoId': 1 }, { lean: true })
    const dadosAluno = []

    for (let i = 0; i < dadosAluno_Turma.length; i++) {
        dadosAluno[i] = await Aluno.find({ _id: dadosAluno_Turma[i].alunoId })
    }
    res.status(200).json({ msg: 'Alunos cadastrado nessa turma:', dadosAluno })
})

module.exports = router
