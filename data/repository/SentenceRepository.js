const db = require('../database')
const Sentence = require("../models/Sentence");

const SENTENCE_INSERT = "INSERT INTO Sentence(text, count) VALUES(?, 0)"
const FIND_BY_ID = "SELECT * FROM Sentence WHERE id = ?"
const FIND_ALL = "SELECT * FROM Sentence ORDER BY id ASC LIMIT ?, ?"
const FIND_FULL = "SELECT * FROM Sentence ORDER BY id ASC"
const FIND_COMPLETED = "SELECT * FROM Sentence WHERE count > 0 ORDER BY id ASC"
const FIND_RANDOM = "SELECT * FROM Sentence ORDER BY RANDOM() LIMIT 1"
const FIND_NEXT = "SELECT * FROM Sentence WHERE count < 3 AND (SELECT count(*) from Analyze where Analyze.sentence_id = Sentence.id and Analyze.user_id = ?) = 0 ORDER BY id ASC LIMIT 1"
const REMOVE = "DELETE FROM Sentence WHERE id = ?"

const PAGE_LIMIT = 20

class SentenceRepository {

    async insert(sentence) {
        await db.run(SENTENCE_INSERT, [sentence.text])
    }

    async findAll(page) {
        if (page !== undefined) {
            return (await db.all(FIND_ALL, [page * PAGE_LIMIT, PAGE_LIMIT]))
            .map(row => new Sentence(row.id, row.text, row.count))
        }
        else {
            return (await db.all(FIND_FULL))
            .map(row => new Sentence(row.id, row.text, row.count))
        }
    }

    async findById(id) {
        const row = (await db.get(FIND_BY_ID, [id]))
        if (row === undefined) {
            return undefined
        }
        else {
            return new Sentence(row.id, row.text, row.count)
        }
    }


    async findCompleted() {
        return (await db.all(FIND_COMPLETED))
                        .map(row => new Sentence(row.id, row.text, row.count))
    }

    async random() {
        const row = await db.get(FIND_RANDOM)
        return new Sentence(row.id, row.text, row.count)
    }

    async next(userId) {
        const row = await db.get(FIND_NEXT, [userId])
        return new Sentence(row.id, row.text, row.count)
    }

    async remove(id) {
        await db.run(REMOVE, [id])
    }

    async clear() {
        await db.run('delete from Sentence')
    }

    async incrementCount(id) {
        await db.run('update Sentence set count = count + 1 where id = ?', [id])
    }

    async count() {
        const row = await db.get('select count(*) as count from Sentence')
        
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