const { Result } = require("express-validator");
const userRepository = require("../repository/user.repository");
const userValidators = require("./validators/user.validator");

exports.createUser = async (name, email, password) => {
    userValidators.validateFields(name, email, password);
    await userRepository.createUser(name, email, password);
}

exports.updateUser = async (id, name, email, password) => {
    userValidators.validateFields(name, email, password);
    const user = await userRepository.checkUserExists(id);

    if (user === 1) {
        await userRepository.updateUser(id, name, email, password);
    } else {
        throw { status: 404, msg: "No user found for given id." }
    }
}

exports.deleteUser = async (id) => {
    const user = await userRepository.checkUserExists(id);

    if (user === 1) {
        await userRepository.deleteUser(id);
    } else {
        throw { status: 404, msg: "No user found for given id." }
    }
}