const { Result } = require("express-validator");
const authenticationRepository = require("../repository/authentication.repository");
const authenticationValidators = require("./validators/authentication.validator");

exports.login = async (email, password) => {
    authenticationValidators.validateFields(email, password);
    const user = await authenticationRepository.authUser(email, password)
    const result = authenticationValidators.validateUser(user);
    return result.uso_id;
}