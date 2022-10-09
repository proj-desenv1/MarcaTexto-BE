const { response } = require("../app");
const userBusiness = require("../business/user.business");
const { validationResult } = require("express-validator");

exports.createUser = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const {userName, userEmail, userPassword} = req.body;
        await userBusiness.createUser(userName, userEmail, userPassword);
        resp.sendStatus(201);
    } catch(e) {
        next(e);
    }
}
