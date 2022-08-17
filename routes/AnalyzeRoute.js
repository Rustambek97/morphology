const express = require('express')
const router = express.Router()

const authService = require('../data/services/AuthorizeService')
const sentenceService = require('../data/services/SentenceService')
const analyzeService = require('../data/services/AnalyzeService')

const UserData = require("../data/models/UserData");
const AnalyzeModel = require("../data/models/AnalyzeModel");

router.get('/', async (req, res) => {
    try {
        const auth = await authService.authorize(req.session.token)
        const userData = new UserData(auth.user.name, auth.isAdmin)
        const sentence = await sentenceService.nextSentence(auth.user.id)

        res.render('analyze', {
            title: 'Analyze',
            user: userData,
            sentence: sentence,
            layout: 'index'
        })
    }
    catch (ex) {
        console.log(ex)
        res.redirect('/')
    }
})

router.post('/', async (req, res) => {
    try {
        const auth = await authService.authorize(req.session.token)

        const analyze =
            new AnalyzeModel(
                -1,
                auth.user.id,
                req.body.sentence_id,
                req.body.morphology,
                req.body.syntax
            )

        await analyzeService.addAnalyze(req.body.sentence_id, analyze)

        res.redirect('/analyze')
    }
    catch (ex) {
        console.log(ex)
    }
})

router.get('/tags/:id', async (req, res) => {

    let userData

    try {
        const auth = await authService.authorize(req.session.token)
        userData = new UserData(auth.user.name, auth.isAdmin)
    }
    catch(e) {
        userData = undefined
    }
    const sentence = await sentenceService.findById(req.params.id)
    const analyzes = await analyzeService.allAnalyzes(req.params.id)
    
    

    console.log("sentence: " + sentence);

    res.render('tag-overview', {
        user: userData,
        sentence: sentence,
        analyzes: analyzes,
        layout: 'index'
    })
})

module.exports = router