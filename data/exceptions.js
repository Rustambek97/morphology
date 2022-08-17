class UserNotFoundException {
    constructor(username) {
        this.username = username
    }

    message() {
        return "User " + this.username + " not found."
    }
}

class UserAlreadyExistsException {
    constructor(username) {
        this.username = username
    }

    message() {
        return "User " + this.username + " already exists."
    }
}

module.exports = {
    UserNotFoundException,
    UserAlreadyExistsException
}