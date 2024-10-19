const { userModel } = require("../models");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await userModel.find()

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
      const newUser = await userModel.create(req.body);

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