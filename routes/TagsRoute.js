const express = require('express')
const router = express.Router()

const analyzeService = require('../data/services/AnalyzeService')
const authService = require('../data/services/AuthorizeService')
const sentenceService = require('../data/services/SentenceService')


router.get('/tags/:id', async (req, res) => {
    const analyzes = await analyzeService.allAnalyzes(req.params.id)
    res.json(analyzes)
})
