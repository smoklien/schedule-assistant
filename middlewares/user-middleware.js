const path = require('path');

const UserModel = require(path.join('..', 'database', 'user-model'));

const isValidObjectId = (userId) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  return regex.test(userId);
}

// checkIsEmailExist
// 
const checkIsEmailDuplicate = async (req, res, next) => {
  try {
    const { email = '' } = req.body;
    const user = await UserModel.findOne({ email: email.toLowerCase().trim() });

    if (user && user?._id) {
      return res
        .status(409)
        .json({
          error: `User with '${email}' email already exists.`
        });
    }

    next();
  } catch (error) {
    res
      .status(400)
      .json({
        message: error.message
      })
  }
}

const verifyUserExistence = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
      return res
        .status(400)
        .json({
          message: 'The provided ObjectId is not valid. It must be a 24-character hex string.'
        });
    }

    const user = await UserModel.findOne({ _id: userId });

    if (!user && user?._id) {
      return res
        .status(404)
        .json({
          error: `User '${userId}' not found`
        });
    }

    req.user = user;

    next();
  } catch (error) {
    res
      .status(400)
      .json({
        message: error.message
      })
  }
}

module.exports = {
  checkIsEmailDuplicate,
  verifyUserExistence
}