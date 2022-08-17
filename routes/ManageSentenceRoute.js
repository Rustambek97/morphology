const express = require('express')
const router = express.Router()
const xml2js = require('xml2js');

const authService = require('../data/services/AuthorizeService')
const sentenceService = require('../data/services/SentenceService')
const UserData = require("../data/models/UserData");
const Sentence = require("../data/models/Sentence");

router.get('/', async (req, res) => {

    let userData;

    try {
        const auth = await authService.authorize(req.session.token)
        userData = new UserData(auth.user.name, auth.isAdmin)
    }
    catch (ex) {
        userData = undefined
    }

    res.render('manage', {
        title: 'Manage',
        user: userData,
        layout: 'index'
    })
})

router.get('/all', async (req, res) => {

    const page = req.query.p ? req.query.p : (req.session.page ? req.session.page : 1)

    req.session.page = page

    let userData;

    try {
        const auth = await authService.authorize(req.session.token)
        userData = new UserData(auth.user.name, auth.isAdmin)
    }
    catch (ex) {
        userData = undefined
    }

    const sentences = await sentenceService.findAll(page - 1)
    const pages = await sentenceService.pages(page)

    const paging = pages.length > 0 ? {
        pages: pages,
        start: pages[0].number,
        end: pages[pages.length - 1].number
    } : undefined

    res.render('all-sentences', {
        title: 'All Sentences',
        user: userData,
        sentences: sentences,
        paging: paging,
        layout: 'index'
    })
})

router.get('/delete/:id', async (req, res) => {
    await sentenceService.remove(req.params.id)
    res.redirect('/sentence/manage/all')
})

router.post('/upload', async (req, res) => {
    const file = req.files.text
    const content = file.data.toString()

    try {
        console.log(content);
        const xml = await xml2js.parseStringPromise(content)
        const textes = xml.corpus.text

        for (let i = 0; i < textes.length; i++) {
            const elem = textes[i];
            const text = elem.content[0]._

            const sentences = text.split('.')
                .map(s => s.trim())
                .filter(s => s !== "")

            for (let j = 0; j < sentences.length; j++) {
                const element = sentences[j];
                const sentence = new Sentence(-1, element)
                await sentenceService.addSentence(sentence)
            }
        }
    }
    catch (ex) {
        console.log(ex)
    }
    res.redirect('/sentence/manage')
})

router.get('/structure', async (req, res) => {

    const file = `${__dirname}/../public/structure.xml`;
    res.download(file); // Set disposition and send it.
})

router.post('/', async (req, res) => {
    try {

        const text = req.body.text

        const sentences = text.split('.')
            .map(s => s.trim())
            .filter(s => s !== "");

        for (let j = 0; j < sentences.length; j++) {
            const element = sentences[j];
            const sentence = new Sentence(-1, element)
            await sentenceService.addSentence(sentence)
        }
    }
    catch (ex) {
        console.log(ex)
    }
    res.redirect('/sentence/manage')
})

module.exports = router