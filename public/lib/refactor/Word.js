class Word {

    span
    text

    #innerWords = []

    display

    constructor(element, span, text, syntaxIndicator, morphologyIndicator) {
        this.element = element
        this.span = span
        this.text = text
        this.display = text
        this.tags = {
            syntax: new TagList(syntaxIndicator),
            morphology : new TagList(morphologyIndicator)
        }
    }

    add(type, tag) {
        const tags = this.tags[type]

        if (type === 'syntax') {
            tags.set(tag)
        }
        else if (tags.contains(tag)) {
            throw new TagAlreadyContainsException()
        }
        else {
            tags.add(tag)
        }
    }

    remove(type) {
        const tags = this.tags[type]
        tags.remove()
    }

    toggle() {
        this.span.classList.toggle('active-element')
    }

    morphologyTags() {
        return this.text + this.tags.morphology.codes
    }

    syntaxTags() {
        return this.text + this.tags.syntax.codes
    }

    concat(other) {
        this.#innerWords.push(other)
        this.update()
    }

    split() /*Word*/{
        if (this.#innerWords.length === 0) {
            return undefined
        }
        const inner = this.#innerWords.pop()
        this.update()
        return inner
    }

    update() {
        this.display = this.#innerWords.reduce((display, word) => 
            display + " " + word.display, this.text
        )
        this.span.innerText = this.display
    }
}

class TagAlreadyContainsException { }

class Indicator {

    constructor(element) {
        this.element = element
        this.element.style.visibility = 'hidden'
    }

    hide() {
        this.element.style.visibility = 'hidden'
    }

    show() {
        this.element.style.visibility = 'visible'
    }
}

class TagList {

    #label = ""
    #codes = ""
    #tags = []

    #indicator

    constructor(indicator) {
        this.#indicator = indicator
    }

    add(tag) {
        this.#tags.push(tag)
        this.#updateLabel()
    }

    set(tag) {
        this.#tags.length = 0
        this.add(tag)
    }

    contains(tag) {
        return this.#tags.indexOf(tag) !== -1
    }

    remove() {
        this.#tags.pop()
        this.#updateLabel()
    }

    get tags() {
        return this.#tags
    }

    get isEmpty() {
        return this.#tags.length === 0
    }

    get codes() {
        return this.#codes
    }

    get label() {
        return this.#label
    }

    #updateLabel() {
        this.#label = this.#tags.join('  |  ')

        if (this.#tags.length === 0) {
            this.#indicator.hide()
        }
        else {
            this.#indicator.show()
        }

        let temp = ""

        this.#tags.forEach(tag => {
            temp = temp.concat('/', tag.tag)
        })

        this.#codes = temp
    }

    toString() {
        return this.#label
    }
}