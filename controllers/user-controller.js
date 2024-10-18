const path = require('path');

const UserModel = require(path.join('..', 'database', 'user-model'));


module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await UserModel.find()

      res.json(users);
    } catch (error) {
      res
        .status(400)
        .json({
          message: error.message
        });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = req.user;

      res.json(user);
    } catch (error) {
      res
        .status(400)
        .json({
          message: error.message
        });
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = await UserModel.create(req.body);

      res.status(201).json(newUser);
    } catch (error) {
      res
        .status(400)
        .json({
          message: error.message
        });
    }
  }
}