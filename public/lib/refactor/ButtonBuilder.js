function buildSyntaxButtons(container, callback) {
    return new ButtonBuilder(container, syntaxButtons, callback).buildGrid()
}

function buildMorphologyButtons(container, callback) {
    return new ButtonBuilder(container, morfologyButtons, callback).buildGrid()
}

class Button {
    constructor(name, type, menu, tag) {
        this.name = name
        this.type = type
        this.menu = menu
        this.tag = tag
    }
}

class Tag {
    constructor(label, tag) {
        this.label = label
        this.code = tag
    }

    toString() {
        return this.label
    }
}

class ButtonBuilder {
    constructor(grid, buttons, callback) {
        this.grid = grid
        this.buttons = buttons
        this.callback = callback
    }

    buildGrid() {
        this.buttons.forEach(row => {
            const htmlRow = this.buildRow(row)
            this.grid.appendChild(htmlRow)
        });

        return this.grid
    }
    
    buildRow(buttons) {
        const row = document.createElement('div')
        row.classList.add('row')
    
        buttons.forEach(button => {
            const htmlColumn = this.buildColumn(button)
            row.appendChild(htmlColumn)
        })
    
        return row
    }
    
    buildColumn(button) {
        if (button.type === 'menu') {
            const template = document.getElementById('dropdown-template').content.cloneNode(true)
            const text = template.querySelector('span.txt')
            const menu = template.querySelector('div.menu')
        
            text.innerText = button.name
        
            button.menu.forEach(tag => {
                const tagDiv = document.createElement('div')
                tagDiv.classList.add('item')
                tagDiv.innerText = tag.label
    
                tagDiv.onclick = () => {
                    this.callback(tag)
                }
    
                menu.appendChild(tagDiv)
            })
        
            return template
        }
        else if (button.type === 'button') {
            const template = document.getElementById('button-template').content.cloneNode(true)
            const text = template.querySelector('span.text')
            const htmlButton = template.querySelector('div.button')
            text.innerText = button.name

            htmlButton.onclick = () => {
                console.log('button pressed')
                this.callback(button.tag)
            }

            return template
        }
    }
    
}


const morfologyButtons = [
    // 1 row
    [
        new Button('Ot', 'menu', [
            new Tag('Birlik ot uchun', 'BO'),
            new Tag('Koplich otlar', 'KO'),
            new Tag('Shaxs oti', 'SHO'),
            new Tag('Narsa oti', 'NO'),
            new Tag('Joy oti', 'JO'),
        ]),

        new Button('Sifat', 'menu', [
            new Tag('Xususiyat-holat sifati', 'XHS'),
            new Tag('Rang-tus sifati', 'RTS'),
            new Tag('Maza-ta\'m sifati', 'MTS'),
            new Tag('Hid sifati', 'HS'),
            new Tag('Joy oti', 'JO'),
        ]),

        new Button('Son', 'menu', [
            new Tag('Sanoq sonlar', 'SS'),
            new Tag('Dona son', 'DS'),
            new Tag('Chama son', 'CHS'),
            new Tag('Taqsim son', 'TS'),
            new Tag('Kasr son', 'KS'),
        ]),
        new Button('Komakchi', 'button', [], new Tag('Komakchi', 'KMC'))
    ]
]

const syntaxButtons = [
    // 1 row
    [
        new Button('Ega', 'button', [], new Tag('Ega', 'EGA')),
        new Button('Ot kesim', 'button', [], new Tag('Ot kesim', 'OK')),
        new Button('Fe\'l kesim', 'button', [], new Tag('Fe\'l kesim', 'FK')),
        new Button('Qaratqich aniqlovchi', 'button', [], new Tag('Qaratqich aniqlovchi', 'QA'))
    ]
]