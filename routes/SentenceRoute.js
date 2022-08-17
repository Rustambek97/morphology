const express = require('express')
const router = express.Router()

const authService = require('../data/services/AuthorizeService')
const sentenceService = require('../data/services/SentenceService')
const UserData = require("../data/models/UserData");

router.get('/', async (req, res) => {
    try {
        const auth = await authService.authorize(req.session.token)
        const userData = new UserData(auth.user.name, auth.isAdmin)

        await renderSentences(req, res, userData)
    }
    catch (ex) {
        await renderSentences(req, res, undefined)
    }
})

const renderSentences = async (req, res, userData) => {
    const page = req.query.p ? req.query.p : 1

    const sentences = await sentenceService.findAll(page - 1)
    const pages = await sentenceService.pages(page)
    const paging = pages.length > 0 ? {
        pages: pages,
        start: pages[0].number,
        end: pages[pages.length-1].number
    } : undefined

    res.render('sentences', {
        title: 'Sentences',
        user: userData,
        sentences: sentences,
        paging: paging,
        layout: 'index'
    })
}

module.exports = router