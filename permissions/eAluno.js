const SECRET = 'passwell'
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
require('../models/Aluno')
const Aluno = mongoose.model('alunos')

function eAluno(req, res, next) {
    const token = req.header('x-access-token')
    console.log('teste: ' + token)
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: 'Acesso negado' }).end()
        } else {
            const userId = decoded.userId
            console.log(userId)
            Aluno.findOne({ _id: userId }).then((permissao) => {
                if (permissao.permissao == 0) {
                    next()
                } else {
                    res.status(401).json({ status: 401, msg: 'Acesso negado' }).end()
                }
            }).catch((err) => {
                res.status(401).json({ status: 401, msg: 'O usuário não é um aluno' }).end()
            })
        }
    })
}

module.exports = eAluno