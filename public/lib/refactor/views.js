class View {
    root
    constructor(root /*HTMLElement*/) {
        this.root = root
    }
}


class GridView extends View {

    constructor(grid) {
        super(grid)
    }

    add(row /*RowView*/) {
        this.root.appendChild(row.root)
    }
}

class RowView extends View {
    constructor() {
        super(document.createElement('div'))
        this.root.classList.add('row')
    }

    add(dropdown /*DropdownView*/) {
        this.root.appendChild(dropdown.root)
    }
}

class DropdownView extends View {
    constructor(name, menu) {
        super(document.getElementById('dropdown-template').content.cloneNode(true))
        const text = this.root.querySelector('span.txt')
        this.root.querySelector('div.ui.dropdown.fluid.button').appendChild(menu)

        text.innerText = name

        this.menu = menu
    }

    add(item /*View*/) {
        this.menu.appendChild(item.root)
    }
}

class ButtonView extends View {
    constructor(name, tag, callback) {
        super(document.getElementById('button-template').content.cloneNode(true))
        const text = this.root.querySelector('span.text')
        const htmlButton = this.root.querySelector('div.button')
        text.innerText = name

        htmlButton.onclick = () => {
            callback(new Tag(name, tag))
        }
    }
}

class ItemView extends View {
    constructor(name, tag, callback) {
        super(document.createElement('div'))

        this.root.classList.add('item')
        this.root.innerText = name
        if (callback !== undefined) {
            this.root.onclick = () => {
                callback(new Tag(name, tag))
            }
        }
    }
}

class MenuView extends ItemView {

    constructor(name) {
        super(name)

        const icon = document.createElement('i')
        icon.classList.add('dropdown', 'icon')

        const menu = document.createElement('div')
        menu.classList.add('menu')

        this.root.appendChild(icon)
        this.root.appendChild(menu)

        this.menu = menu
    }

    add(item /*ItemView*/) {
        this.menu.appendChild(item.root)
    }
}

class Tag {
    constructor(label, tag) {
        this.label = label
        this.tag = tag
    }

    toString() {
        return this.label
    }
}