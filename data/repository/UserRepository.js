const db = require('../database')

const USER_INSERT = "INSERT INTO User(name, 'group', phone, username, password, token, role) VALUES(?, ?, ?, ?, ?, ?, ?)"
const USER_BY_ID = "SELECT * FROM User WHERE id = ?;"
const USER_ALL = "SELECT * FROM User;"
const USER_BY_TOKEN = "SELECT * FROM User WHERE token = ?;"
const USER_BY_USERNAME = "SELECT * FROM User WHERE username = ?;"
const USER_REMOVE = "DELETE FROM Sentence WHERE id = ?;"

class UserRepository {

    async insert(token, username, password, user) {
        const defaultRole = 'USER'
        await db.run(USER_INSERT, [user.name, user.group, user.phone, username, password, token, defaultRole])
        return await this.findByToken(token)
    }

    async findAll() {
        return await db.all(USER_ALL)
    }

    async findById(id) {
        return await db.get(USER_BY_ID, [id])
    }

    async findByToken(token) {
        return await db.get(USER_BY_TOKEN, [token])
    }

    async findByUsername(username) {
        return await db.get(USER_BY_USERNAME, [username])
    }

    async remove(id) {
        await db.run(USER_REMOVE, [id])
    } 
}

module.exports = new UserRepository()