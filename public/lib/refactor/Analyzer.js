class Analyzer {

    words
    callback
    list

    constructor(words, callback) {
        this.words = words
        this.callback = callback
        this.list = new CircularList(words)

        this.list.current().toggle()
        this.sendCallback()
    }

    prev() {
        this.list.current().toggle()
        this.list.prev().toggle()

        this.sendCallback()
    }

    current() {
        return this.list.current()
    }

    concatWord() {
        const word = this.list.current()
        const next = this.list.peek(1)
        if (next !== undefined) {
            word.concat(next)
            this.list.removeNext()
            this.sendCallback()
        }
    }

    splitWord() {
        const word = this.list.current()
        const inner = word.split()
        if (inner) {
            this.list.insertNext(inner)
        }
        this.sendCallback()
        return inner !== undefined
    }

    next() {
        this.list.current().toggle()
        this.list.next().toggle()
        this.sendCallback()
    }

    addTag(type, tag) {
        this.list.current().add(type, tag)
        this.sendCallback()
    }

    removeTag(type) {
        this.list.current().remove(type)
        this.sendCallback()
    }

    sendCallback() {
        const word = this.list.current()
        this.callback(word.display, word.tags)
    }
}