const { Result } = require("express-validator");
const userRepository = require("../repository/user.repository");
const userValidators = require("./validators/user.validator");
const sendEmail = require("./utils/send-email");

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
    return await userRepository.updateUser(id, name || user.uso_nome, email || user.uso_email, password || user.uso_senha);
}

exports.deleteUser = async (id) => {
    const user = await userRepository.checkUserExists(id);
    userValidators.validateUser(user);
    await userRepository.deleteUser(id);
}

exports.resetPassword = async (email) => {
    const user = await userRepository.findUserByEmail(email);
    if(user) {
        const newPassword = Math.random().toString(36).substring(2,8);
        await userRepository.updateUser(user.uso_id, user.uso_nome, user.uso_email, newPassword);
        try {
            await sendEmail("Reset de senha", `<h1>Reset de senha</h1><p>Sua senha foi resetada. Acesse sua conta com a senha: ${newPassword}</p>`, user.uso_email);
        } catch (e) {
            await userRepository.updateUser(user.uso_id, user.uso_nome, user.uso_email, user.uso_senha);
            throw e;
        }
    }
    return { msg: `Se houver uma conta associada ao e-mail fornecido, uma nova senha será gerada e enviada para o endereço ${email}. Caso não tenha recebido, verifique sua caixa de spam.`};
} 
