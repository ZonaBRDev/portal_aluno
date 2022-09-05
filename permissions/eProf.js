const SECRET = 'passwell'
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
require('../models/Professor')
const Professor = mongoose.model('professores')

function eProf(req, res, next) {
    const token = req.header('x-access-token')
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: 'Acesso negado' }).end()
        } else {
            const userId = decoded.userId
            Professor.findOne({ _id: userId }).then((permissao) => {
                if (permissao.permissao == 1) {
                    next()
                } else {
                    res.status(401).json({ status: 401, msg: 'Acesso negado' }).end()
                }
            }).catch((err) => {
                res.status(401).json({ status: 401, msg: 'O usuário não é um Professor' }).end()
            })
        }
    })
}

module.exports = eProf