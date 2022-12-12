const { sign } = require("jsonwebtoken");
const authenticationBusiness = require("../business/authentication.business");
const { validationResult } = require("express-validator");

exports.login = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { email, password } = req.body;
        const user = await authenticationBusiness.login(email, password);
        const token = sign({ uso_id: user.uso_id, uso_nome: user.uso_nome}, process.env.SECRET, { expiresIn: "5h" });
        resp.status(201).json({ token: token });
    } catch(e) {
        next(e);
    }
}