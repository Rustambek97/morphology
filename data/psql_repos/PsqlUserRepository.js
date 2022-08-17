const db = require('../psqldatabase')

const USER_INSERT = "INSERT INTO users(name, \"group\", phone, username, password, token, role) VALUES($1, $2, $3, $4, $5, $6, $7)"
const USER_BY_ID = "SELECT * FROM users WHERE id = $1;"
const USER_ALL = "SELECT * FROM users;"
const USER_BY_TOKEN = "SELECT * FROM users WHERE token = $1;"
const USER_BY_USERNAME = "SELECT * FROM users WHERE username = $1;"
const USER_WITH_ANALYZES = "SELECT users.*, (SELECT count(*) from analyzes where analyzes.user_id = users.id) as count FROM users;"
const USER_REMOVE = "DELETE FROM sentence WHERE id = $1;"

class UserRepository {

    async insert(token, username, password, user) {
        const defaultRole = 'USER'
        await db.query(USER_INSERT, [user.name, user.group, user.phone, username, password, token, defaultRole])
        return await this.findByToken(token)
    }

    async findAll() {
        return (await db.query(USER_ALL)).rows
    }

    async findById(id) {
        return (await db.query(USER_BY_ID, [id])).rows[0]
    }

    async findByToken(token) {
        return (await db.query(USER_BY_TOKEN, [token])).rows[0]
    }

    async findByUsername(username) {
        return (await db.query(USER_BY_USERNAME, [username])).rows[0]
    }

    async findAllWithCount() {
        return (await db.query(USER_WITH_ANALYZES)).rows
    }

    async remove(id) {
        await db.query(USER_REMOVE, [id])
    } 
}

module.exports = new UserRepository()