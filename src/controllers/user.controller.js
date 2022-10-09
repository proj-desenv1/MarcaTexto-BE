const { response } = require("../app");
const userBusiness = require("../business/user.business");
const { validationResult } = require("express-validator");

exports.createUser = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { name, email, password } = req.body;
        await userBusiness.createUser(name, email, password);
        resp.sendStatus(201);
    } catch(e) {
        next(e);
    }
}
