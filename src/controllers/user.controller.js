const { response } = require("../app");
const bcrypt = require("bcrypt");
const userBusiness = require("../business/user.business");
const { validationResult } = require("express-validator");

exports.createUser = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const {userName, userEmail, userPassword} = req.body;

        bcrypt.hash(userPassword, 15, async (err, hash) => {
            await userBusiness.createUser(userName, userEmail, hash);
            resp.sendStatus(201);
        })
    } catch(e) {
        next(e);
    }
}
