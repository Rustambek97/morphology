module.exports = class AnalyzeModel {

    constructor(id, userId, sentenceId, morphology, syntax) {
        this.id = id
        this.userId = userId
        this.sentenceId = sentenceId
        this.morphology = morphology
        this.syntax = syntax
    }
}