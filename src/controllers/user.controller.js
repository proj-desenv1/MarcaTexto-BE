const { response } = require("../app");
const userBusiness = require("../business/user.business");
const userRepository = require("../repository/user.repository");
const { validationResult } = require("express-validator");

exports.deleteUser = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { id } = req.params;
        const user = await userRepository.findUserById(id);

        if (user === 1) {
            await userBusiness.deleteUser(id);
            resp.sendStatus(200);
        } else {
            resp.sendStatus(404);
        }
    } catch (e) {
        next(e);
    }
}