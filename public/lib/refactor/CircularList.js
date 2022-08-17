class CircularList {
    constructor(items) {
        this.items = items
        this.length = items.length
        this.position = 0
        this.lastPosition = 0
    }

    next() {
        this.lastPosition = this.position

        this.position++;
        if (this.position === this.length) {
            this.position = 0;
        }

        return this.items[this.position]
    }

    prev() {
        this.lastPosition = this.position

        this.position--;
        if (this.position === -1) {
            this.position = this.length-1;
        }
        return this.items[this.position]
    }

    current() {
        return this.items[this.position]
    }

    peek(offset) {
        return this.items[this.position + offset]
    }

    removeNext() {
        this.items.splice(this.position + 1, 1)
        this.length = this.items.length
    }

    insertNext(word) {
        this.items.splice(this.position + 1, 0, word)
        this.length = this.items.length
    }

    last() {
        return this.items[this.lastPosition]
    }

    items() {
        return this.items
    }
}