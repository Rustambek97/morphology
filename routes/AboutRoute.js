const express = require('express')
const authService = require("../data/services/AuthorizeService");
const UserData = require("../data/models/UserData");

const router = express.Router()

router.get('/', async (req, res) => {
    let userData = undefined
    try {
        const auth = await authService.authorize(req.session.token)
        userData = new UserData(auth.user.name, auth.isAdmin)
    }
    catch (ex) {}

    res.render('about', {
        title: 'About',
        user: userData,
        layout: 'index'
    })
})

module.exports = router