const { Result } = require("express-validator");
const userRepository = require("../repository/user.repository");
const userValidators = require("./validators/user.validator");

exports.createUser = async (userName, userEmail, userPassword) => {
    userValidators.validateFields(userName, userEmail, userPassword);
    await userRepository.createUser(userName, userEmail, userPassword);
}
