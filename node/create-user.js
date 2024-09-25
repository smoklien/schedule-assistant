function createUser(name, surname) {
    return {
        name,
        surname,
        email: `${name}.${surname}@ukr.net.com`.toLowerCase().trimm()
    }
}

module.exports = {
    createUser
}