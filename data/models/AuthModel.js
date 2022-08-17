module.exports = class AuthModel {
    constructor(token, user) {
        this.token = token
        this.user = user
        if (user.role === 'ADMIN') {
            this.isAdmin = true
        }
    }
}