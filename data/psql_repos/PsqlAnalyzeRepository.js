const db = require('../psqldatabase')

const INSERT_ANALYZE = "INSERT INTO analyzes(user_id, sentence_id, syntax, morphx) VALUES ($1, $2, $3, $4)"
const FIND_BY_SENTENCE = "SELECT analyzes.id as id, analyzes.syntax as syntax, analyzes.morphx as morph, users.name as user " +
    "FROM analyzes inner join users on analyzes.user_id = users.id " +
    "WHERE sentence_id = $1"

class AnalyzeRepository {

    async insert(analyze) {
        await db.query(INSERT_ANALYZE, [analyze.userId, analyze.sentenceId, analyze.syntax, analyze.morphology])
    }

    async findBySentence(id) {
        return (await db.query(FIND_BY_SENTENCE, [id])).rows
    }
}

module.exports = new AnalyzeRepository()