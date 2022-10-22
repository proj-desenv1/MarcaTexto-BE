const { Result } = require("express-validator");
const userRepository = require("../repository/user.repository");
const userValidators = require("./validators/user.validator");

exports.findUserById = async (id) => {
    const user = userRepository.checkUserExists(id);
    userValidators.validateUser(user);
    return user;
}

exports.createUser = async (name, email, password) => {
    userValidators.validateFields(name, email, password);
    const userEmail = await userRepository.checkEmailExists(email);
    userValidators.validateEmail(userEmail);
    return await userRepository.createUser(name, email, password);
}

exports.updateUser = async (id, name, email, password) => {
    userValidators.validateFields(name, email, password);
    const user = await userRepository.checkUserExists(id);
    userValidators.validateUser(user);
    const userEmail = await userRepository.checkEmailExists(email);
    userValidators.validateEmail(userEmail);
    return await userRepository.updateUser(id, name, email, password);
}

exports.deleteUser = async (id) => {
    const user = await userRepository.checkUserExists(id);
    userValidators.validateUser(user);
    await userRepository.deleteUser(id);
}