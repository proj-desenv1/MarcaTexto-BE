const { response } = require("../app");
const authenticationBusiness = require("../business/authentication.business");
const authenticationRepository = require("../repository/authentication.repository");
const { validationResult } = require("express-validator");

exports.login = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { email, password } = req.body;
        await authenticationBusiness.login(email, password);
        const user = await authenticationRepository.authUser(email, password)

        if (user === 1) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(401);
        }
    } catch(e) {
        next(e);
    }
}