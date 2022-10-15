const jwt = require('jsonwebtoken');
const authenticationBusiness = require("../business/authentication.business");
const authenticationRepository = require("../repository/authentication.repository");
const { validationResult } = require("express-validator");
const { validateToken } = require('./utils/validateToken');
const { returnError } = require('./utils/return-error');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.SECRET;

exports.login = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { email, password } = req.body;
        await authenticationBusiness.login(email, password);
        const user = await authenticationRepository.authUser(email, password)

        if (user === 1) {
            const token = jwt.sign({
                email: email
            }, secret, {expiresIn: "5h"});
            resp.status(201).json({"token":token});
        } else {
            resp.sendStatus(401);
        }
    } catch(e) {
        next(e);
    }
} 

exports.tokenValidation = (req, resp, next) => {
    const token = req.get("x-session-token");
    console.log('token', token)
    try{ 
        validateToken(token, next);
    }
    catch(e) {
        returnError(e, resp); 
    }
};