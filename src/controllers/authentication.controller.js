const { response } = require("../app");
const authenticationBusiness = require("../business/authentication.business");
const { validationResult } = require("express-validator");

exports.login = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { email, password } = req.body;
        await authenticationBusiness.login(email, password);
        resp.sendStatus(200);
    } catch(e) {
        next(e);
    }
}