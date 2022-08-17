const userRepository = require("../psql_repos/PsqlUserRepository");

class AuthorsService {

    async allUsersWithCount() {
        let users = await userRepository.findAllWithCount()
        users.sort((userA, userB) => {
            let a = userA.count
            let b = userB.count

            if (a > b) {
                return -1
            }
            else if (a < b) {
                return 1
            }
            else {
                return 0
            }
        })
        
        return users
    }
}

module.exports = new AuthorsService()