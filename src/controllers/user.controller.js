const { response } = require("../app");
const userBusiness = require("../business/user.business");
const userRepository = require("../repository/user.repository");
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

exports.updateUser = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { id } = req.params;
        const { name, email, password } = req.body;
        await userBusiness.updateUser(id, name, email, password);
        resp.sendStatus(200);
    } catch (e) {
        next(e);
    }
}