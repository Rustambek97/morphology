const sqlite3 = require('sqlite3').verbose()
const util = require('util')

const db = new sqlite3.Database('sentences.db3', (err) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log('Connected to database.')
    }
})

db.run = util.promisify(db.run)
db.all = util.promisify(db.all)
db.get = util.promisify(db.get)

module.exports = db