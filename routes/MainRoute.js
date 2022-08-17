const authService = require('../data/services/AuthorizeService')

const express = require('express')
const url = require('url')

const router = express.Router()

const openUrls = [
    '/',
    '/sentence',
    '/sentence/add',
    '/login',
    // '/register',
    // '/login/check',
    // '/register/available',
    '/about',
    '/actives'
]

router.use('/', async (req, res, next) => {
    
    const requestedUrl = url.parse(req.url).pathname;

    console.log(requestedUrl);

    if (requestedUrl.startsWith('/analyze/tags')) {
        return next()
    }
    else if (!openUrls.includes(requestedUrl)) {
        if (req.session.authorized === undefined || req.session.token === undefined) {
            return res.redirect('/sentence')
        }
        if (requestedUrl.startsWith('/sentence/manage')) {
            const auth = await authService.authorize(req.session.token)
            if (!auth.isAdmin) {
                return res.redirect('/sentence')
            }
        }
    }
    next()
})

router.get('/', async (req, res) => {
        res.redirect('/sentence')
})

router.get('/logout', (req, res) => {
    delete req.session.authorized
    delete req.session.token

    res.redirect('/login')
})

module.exports = router