const db = require('../psqldatabase')
const Sentence = require("../models/Sentence");

const SENTENCE_INSERT = "INSERT INTO sentence(text, count) VALUES($1, 0)"
const FIND_BY_ID = "SELECT * FROM sentence WHERE id = $1"
const FIND_ALL = "SELECT * FROM sentence ORDER BY id ASC LIMIT $2 OFFSET $1"
const FIND_FULL = "SELECT * FROM sentence ORDER BY id ASC"
const FIND_COMPLETED = "SELECT * FROM sentence WHERE count > 0 ORDER BY id ASC"
const FIND_RANDOM = "SELECT * FROM sentence ORDER BY RANDOM() LIMIT 1"
const FIND_NEXT = "SELECT * FROM sentence WHERE count < 3 AND (SELECT count(*) from analyzes where analyzes.sentence_id = sentence.id and analyzes.user_id = $1) = 0 ORDER BY id ASC LIMIT 1"
const REMOVE = "DELETE FROM sentence WHERE id = $1"

const PAGE_LIMIT = 20

class SentenceRepository {

    async insert(sentence) {
        await db.query(SENTENCE_INSERT, [sentence.text])
    }

    async findAll(page) {
        if (page !== undefined) {
            return (await db.query(FIND_ALL, [page * PAGE_LIMIT, PAGE_LIMIT])).rows
            .map(row => new Sentence(row.id, row.text, row.count))
        }
        else {
            return (await db.query(FIND_FULL)).rows
            .map(row => new Sentence(row.id, row.text, row.count))
        }
    }

    async findById(id) {
        const rows = (await db.query(FIND_BY_ID, [id])).rows
        if (rows.length == 0) {
            return undefined
        }
        else {
            let row = rows[0]
            return new Sentence(row.id, row.text, row.count)
        }
    }


    async findCompleted() {
        return (await db.query(FIND_COMPLETED)).rows
                        .map(row => new Sentence(row.id, row.text, row.count))
    }

    async random() {
        const row = (await db.query(FIND_RANDOM)).rows[0]
        return new Sentence(row.id, row.text, row.count)
    }

    async next(userId) {
        console.log(userId)
        const rows = (await db.query(FIND_NEXT, [userId])).rows
        console.log(rows)
        let row = rows[0]
        console.log(row)
        return new Sentence(row.id, row.text, row.count)
    }

    async remove(id) {
        await db.query(REMOVE, [id])
    }

    async clear() {
        await db.query('delete from sentence')
    }

    async incrementCount(id) {
        await db.query('update sentence set count = count + 1 where id = $1', [id])
    }

    async count() {
        const row = (await db.query('select count(*) as count from sentence')).rows[0]
        
        const dp = row.count % PAGE_LIMIT
        let pages

        if (dp === 0) {
            pages = row.count / PAGE_LIMIT
        }
        else {
            pages = ((row.count - dp) / PAGE_LIMIT) + 1
        }
        return pages
    }
}

module.exports = new SentenceRepository()
