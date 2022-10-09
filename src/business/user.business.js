const { Result } = require("express-validator");
const userRepository = require("../repository/user.repository");

exports.deleteUser = async (id) => {
    await userRepository.deleteUser(id);
}