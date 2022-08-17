class ButtonGroup {

    #lastButton

    constructor(buttons, callback) {

        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i]

            button.onclick = () => {
                button.classList.add('active')
                if (this.#lastButton) {
                    this.#lastButton.classList.remove('active')
                }
                this.#lastButton = button

                callback(button)
            }
        }
    }
}