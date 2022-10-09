const { Result } = require("express-validator");
 const userRepository = require("../repository/user.repository");
 const userValidators = require("./validators/user.validator");

 exports.updateUser = async (id, name, email, password) => {
     userValidators.validateFields(name, email, password);
     await userRepository.updateUser(id, name, email, password);
 }