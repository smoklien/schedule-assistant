const database = require('../database/users'); 

module.exports = {
    getAllUser: (req, res) => {
        res.json(database);
    },

    getUserByID: (req, res) => {
        const { userIndex } = req.params;
    
        console.log(req.params);
        console.log(userIndex);
    
        res.json(database[userIndex] || `User #${userIndex} not found`);
    },

    createUser: (req, res) => {
        const newUser = req.body;
    
        database.push(req.body);
    
        res.json(database);
    }
}