const userRepo = require('../psql_repos/PsqlUserRepository')
const exceptions = require('../exceptions')
const crypto = require('crypto-js')

const User = require("../models/User");
const AuthModel = require("../models/AuthModel");

class AuthorizeService {

    // returns true when candidate not found - login is available
    // returns false when candidate found - username is already used
    async isUsernameAvailable(username) {
        const candidate = await userRepo.findByUsername(username)
        return !candidate
    }

    async authorize(token) {
        const candidate = await userRepo.findByToken(token)

        if (candidate) {
            const user = new User(
                candidate.id,
                candidate.name,
                candidate.group,
                candidate.phone,
                candidate.username,
                "<hidden>",
                candidate.role
            )

            return new AuthModel(token, user)
        }

        throw new exceptions.UserNotFoundException()
    }

    async login(username, password) {
        const token = generateToken(username, password)
        const candidate = await userRepo.findByToken(token)

        if (candidate) {
            const user = new User(
                candidate.id,
                candidate.name,
                candidate.group,
                candidate.phone,
                candidate.username,
                candidate.role
            )

            return new AuthModel(token, user)
        }
        
        throw new exceptions.UserNotFoundException(username)
    }

    async register(data) {
        const username = data.username
        const password = data.password
        
        const candidate = await userRepo.findByUsername(username)

        if (candidate) {
            throw new exceptions.UserAlreadyExistsException(username)
        }

        const token = generateToken(username, password)

        // save token and password with crypto 
        return await userRepo.insert(token, username, crypto.SHA256(password), data)
    }
}

function generateToken(username, password) {
    return crypto.SHA256(username + password).toString()
}

module.exports = new AuthorizeService()