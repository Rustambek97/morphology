const authService = require('../data/services/AuthorizeService')
const { UserAlreadyExistsException } = require("../data/exceptions");

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('register', {title: 'Create Account', layout: 'index'})
})

router.post('/', async (req, res) => {
    try {
        const user = await authService.register(req.body)
        authorincate(req, res, user)
    }
    catch(exception) {
        const status = exception instanceof UserAlreadyExistsException ? 403 : 500
        res.sendStatus(status)
    }
})

router.get('/available', async (req, res) => {
    const query = req.query
    try {
        const isAvailable = await authService.isUsernameAvailable(query.username)
        res.sendStatus(isAvailable ? 200 : 403)
    }
    catch (exception) {
        res.sendStatus(500)
    }
})

function authorincate(req, res, user) {
    req.session.authorized = true
    req.session.token = user.token
    res.redirect('/')
}

module.exports = router