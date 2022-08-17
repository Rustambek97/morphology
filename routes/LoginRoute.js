const authService = require('../data/services/AuthorizeService')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('login', {title: 'Authorincate', layout: 'index'})
})

router.post('/', async (req, res) => {
    const { username, password } = req.body

    if (isEmpty(username) || isEmpty(password)) {
        return res.sendStatus(403)
    }

    try {
        const user = await authService.login(username, password)
        authorincate(req, res, user)
    }
    catch(exception) {
        console.log(exception)
        res.sendStatus(404)
    }
})

router.get('/check', async (req, res) => {
    const { username, password } = req.query
    try {
        await authService.login(username, password)
        res.sendStatus(200)
    }
    catch(exception) {
        console.log(exception)
        res.sendStatus(404)
    }
})

function authorincate(req, res, user) {
    req.session.authorized = true
    req.session.token = user.token
    res.redirect('/')
}

function isEmpty(value) {
    return value === undefined || value === null || value === ''
}

module.exports = router