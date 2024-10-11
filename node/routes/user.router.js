const { Router, request, response } = require('express');
const database = require('../database/users'); 

const router = Router();

// const getAllUsers = () => {
//   return fs.readFile(path.join(__dirname, 'database', 'users.json'))
//   .then(data => JSON.parse(data.toString()));
// }
//
// router.get('/users', (req, res) => {
//   getAllUsers()
//   .then(users => { 
//     res.send(users); 
//   })
//   .catch(error => {
//     console.error('Error fetching users:', error);
//     res.status(500).send('Internal server error');
//   });
// });

router.get('/', (req, res) => {
    res.json(database);
})

router.get('/:userIndex', (req, res) => {
    const { userIndex } = req.params;

    console.log(req.params);
    console.log(userIndex);

    res.json(database[userIndex] || `User #${userIndex} not found`);
})

router.post('/', (req, res) => {
    const newUser = req.body;

    database.push(req.body);

    res.json(database);
})

module.exports = router;