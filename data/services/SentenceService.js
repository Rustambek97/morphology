const sentenceRepository = require('../psql_repos/PsqlSentenceRepository')

class SentenceService {
    // returns Sentence[]
    async findAll(page) {
        return await sentenceRepository.findAll(page)
    }

    async findById(id) {
        return await sentenceRepository.findById(id)
    }

    async addSentence(sentence) {
        await sentenceRepository.insert(sentence)
    }

    async randomSentence() {
        return await sentenceRepository.random()
    }

    async nextSentence(userId) {
        return await sentenceRepository.next(userId)
    }

    async remove(id) {
        await sentenceRepository.remove(id)
    }

    async pages(page) {
        const count = await sentenceRepository.count()
        const pages = []
        for (let index = 1; index <= count; index++) {
            pages.push({
                number: index,
                active: index == page ? 'active' : ''
            })
        }
        return pages
    }
}

module.exports = new SentenceService()