const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// models
require('../models/Professor')
const Professor = mongoose.model('professores')
require('../models/Turma')
const Turma = mongoose.model('turmas')
require('../models/Aluno_Turma')
const Aluno_Turma = mongoose.model('alunos_turmas')
require('../models/Aluno')
const Aluno = mongoose.model('alunos')
require('../models/Boletim')
const Boletim = mongoose.model('boletins')

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
    const dadosAluno_Turma = await Aluno_Turma.find({ turmaId: turmaId }, { '_id': 0, 'alunoId': 1 }, { lean: true }).sort({date: 'DESC'})
    const dadosAluno = []
    const dadosBoletim = []

    for (let i = 0; i < dadosAluno_Turma.length; i++) {
        dadosAluno[i] = await Aluno.find({ _id: dadosAluno_Turma[i].alunoId }, { 'senha': 0 })
        dadosBoletim[i] = await Boletim.find({ alunoId: dadosAluno_Turma[i].alunoId })
    }
    res.status(200).json({ msg: 'Alunos cadastrado nessa turma:', dadosAluno, dadosBoletim })
})

router.put('/turmas/boletim', async (req, res) => {
    const dadosBoletim = await Boletim.findOne({ alunoId: req.body.alunoId })
    var nota1 = req.body.nota1
    var nota2 = req.body.nota2
    var nota3 = req.body.nota3
    var nota4 = req.body.nota4

    if (nota1 == '') {
        nota1 = null
    }
    else if (nota2 == '') {
        nota2 = null
    }
    else if (nota3 == '') {
        nota3 = null
    }
    else if (nota4 == '') {
        nota4 = null
    }

    await Boletim.findOne({ alunoId: req.body.alunoId }).then((dados) => {
        dados.nota1 = nota1
        dados.nota2 = nota2
        dados.nota3 = nota3
        dados.nota4 = nota4
        dados.save().then(() => {
            res.json({
                msg: 'Nota inserida com sucesso',
                dados:
                {
                    nota1: nota1,
                    nota2: nota2,
                    nota3: nota3,
                    nota4: nota4
                }
            })
        }).catch((err) => {
            console.log('Erro: ' + err)
        })
    })
})

module.exports = router
