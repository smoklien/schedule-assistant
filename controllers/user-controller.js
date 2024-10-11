const path = require('path');

const database = require(path.join('..', 'database', 'users'));

module.exports = {
    getAllUser: (req, res) => {
        res.json(database);
    },

    getUserByID: (req, res) => {
        const { userIndex } = req.params;
        const user = database[userIndex];

        if (!user) {
            res.status(404).json(`User #${userIndex} not found`);
            return;
        }
        
        res.json(database[userIndex]);
    },

    createUser: (req, res) => {
        const newUser = req.body;
    
        database.push(req.body);
    
        res.json(database);
    }
}