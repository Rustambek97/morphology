const db = require('../database')
const Analyze = require("../models/Analyze");

const INSERT_ANALYZE = "INSERT INTO Analyze(user_id, sentence_id, syntax, morph) VALUES (?, ?, ?, ?)"
const FIND_BY_SENTENCE = "SELECT Analyze.id as id, Analyze.syntax as syntax, Analyze.morph as morph, User.name as user " +
    "FROM Analyze inner join User on Analyze.user_id = User.id " +
    "WHERE sentence_id = ?"

class AnalyzeRepository {

    async insert(analyze) {
        await db.run(INSERT_ANALYZE, [analyze.userId, analyze.sentenceId, analyze.syntax, analyze.morphology])
    }

    async findBySentence(id) {
        return await db.all(FIND_BY_SENTENCE, [id])
    }
}

module.exports = new AnalyzeRepository()