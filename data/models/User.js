module.exports = class User {
    constructor(id, name, group, phone, username, password, role) {
        this.id = id
        this.name = name
        this.group = group
        this.phone = phone
        this.username = username
        this.password = password
        this.role = role
    }
}