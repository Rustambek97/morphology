$(() => {

    const textTemplate = document.getElementById('text-template').content.cloneNode(true)
    const text = textTemplate.getElementById('text').innerHTML
    const textId = textTemplate.getElementById('text-id').innerHTML

    let analyzeType = ''

    const container = document.getElementById('sentence-container')
    const syntaxContainer = document.getElementById('syntax-grid')
    const morphologyContainer = document.getElementById('morfology-grid')

    const syntaxButton = document.getElementById('syntax')
    const morfologyButton = document.getElementById('mofology')

    const syntaxCaret = document.getElementById('syntax-caret')
    const morphologyCaret = document.getElementById('morphology-caret')

    const words = text.split(' ')
        .filter(s => s.trim() !== "" )
        .map(s => buildWord(s.trim()))


    const analyzer = new Analyzer(words, (text, tags) => {
        $('#current__word').text(text)
        $('#syntax-tags').text(tags.syntax.toString())
        $('#morphology-tags').text(tags.morphology.toString())
    })

    function render() {
        container.innerHTML = ""
        
        analyzer.words.forEach(word => {
            container.appendChild(word.element)
        })
    }

    render()

    const syntaxGrid = parse(syntaxContainer, sintaktikButtons, (tag) => {
        analyzer.addTag('syntax', tag)
    })

    const morphologyGrid = parse(morphologyContainer, morfologyButtons, (tag) => {
        try {
            analyzer.addTag('morphology', tag)
        }
        catch(e) {
            console.log(e)
            if (e instanceof TagAlreadyContainsException) {
                $('#morphology-tags')
                    .popup({
                        position: "right center",
                        content: `Tag already exists`,
                        on: 'click'
                    })
                    .popup('show')
            }
        }
    })

    new ButtonGroup([syntaxButton, morfologyButton], button => {
        console.log(button)
        if (button === syntaxButton) {
            $(syntaxGrid).show()
            $(morphologyGrid).hide()
            morphologyCaret.style.visibility = 'hidden'
            syntaxCaret.style.visibility = 'visible'
            analyzeType = 'syntax'
        }
        else {
            $(syntaxGrid).hide()
            $(morphologyGrid).show()
            morphologyCaret.style.visibility = 'visible'
            syntaxCaret.style.visibility = 'hidden'
            analyzeType = 'morphology'
        }
    })
    syntaxButton.onclick(null)

    $('#nav-left').on('click',() => {
        analyzer.prev()
    })

    $('#nav-right').on('click',() => {
        analyzer.next()
    })

    $('#remove-tag').on('click',() => {
        analyzer.removeTag(analyzeType)
    })

    $('#add-word').on('click', () => {
        analyzer.concatWord()
        render()
    })

    $('#split-word').on('click', () => {
        if(analyzer.splitWord()) {
            render()
        }
    })

    $('#show-tags-button').on('click', () => {

        const syntaxWords = collectTags(word => word.syntaxTags())
        const morphologyWords = collectTags(word => word.morphologyTags())

        $('#modal-syntax-tags').text(syntaxWords)
        $('#modal-morphology-tags').text(morphologyWords)

        $('#show-tags-modal').modal('show')
    })

    $('#commit-button').on('click', () => {

        const isCorrect = analyzer.words.every(word => {
            return !(word.tags.morphology.isEmpty)
        })
        
        if (isCorrect) {
            const syntaxWords = collectTags(word => word.syntaxTags())
            const morphologyWords = collectTags(word => word.morphologyTags())

            const form = document.getElementById('send_form')
            const idInput = document.getElementById('sentence_id')
            const morphInput = document.getElementById('morphology-input')
            const syntaxInput = document.getElementById('syntax-input')

            form.setAttribute('action', '/analyze/')
            idInput.value = textId
            morphInput.value = morphologyWords
            syntaxInput.value = syntaxWords

            console.log(syntaxInput.value)

            console.log(form.getAttribute('action'))

            $(form).submit()
        }
        else {
            $('#warning').modal('show')
        }
    })

    function collectTags(predicate) {
        return analyzer.words.reduce((text, word) => {
            return text + predicate(word) + "-"
        }, "")
    }
})

function buildWord(word) {
    const template = document.getElementById('word-template').content.cloneNode(true)
    const element = template.querySelector('.element')
    const span = element.querySelector('.word')
    const indicators = element.querySelector('.indicators')
    const syntax = indicators.querySelector('.red')
    const morphology = indicators.querySelector('.blue')

    span.innerText = word

    return new Word(element, span, word, new Indicator(syntax), new Indicator(morphology))
}