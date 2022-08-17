const analyzeRepository = require('../psql_repos/PsqlAnalyzeRepository')
const sentenceRepository = require('../psql_repos/PsqlSentenceRepository')

class AnalyzeService {
    async addAnalyze(id, analyze) {
        await sentenceRepository.incrementCount(id)
        await analyzeRepository.insert(analyze)
    }

    async allAnalyzes(id) {
       return await analyzeRepository.findBySentence(id)
    }
}

module.exports = new AnalyzeService()