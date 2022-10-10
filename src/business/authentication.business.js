const { Result } = require("express-validator");
const authenticationRepository = require("../repository/authentication.repository");
const authenticationValidators = require("./validators/authentication.validator");

exports.login = async (email, password) => {
    authenticationValidators.validateFields(email, password);
    const user = await authenticationRepository.authUser(email, password)

    if (user === 1) {
        await authenticationRepository.authUser(email, password);
    } else {
        throw { status: 401, msg: "User not found." }
    }
}