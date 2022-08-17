const express = require('express')
const router = express.Router()

const authorsService = require('../data/services/AuthorsService')

router.get('/', async (req, res) => {

    let users = await authorsService.allUsersWithCount()

    res.render('actives', {
        title: "Faollar",
        users: users,
        layout: "index"
    })
})

module.exports = router