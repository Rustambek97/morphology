const colors = [
    undefined,
    'teal',
    'blue',
    'violet'
]

module.exports = class Sentence {
    constructor(id, text, count) {
        this.id = id
        this.text = text
        this.count = count
        this.color = colors[count]
        this.check = count === 3 ? true : undefined
    }
}