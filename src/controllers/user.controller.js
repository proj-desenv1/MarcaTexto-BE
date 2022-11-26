const userBusiness = require("../business/user.business");
const { validationResult } = require("express-validator");

exports.findUserById = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { id } = req.params;
        const user = await userBusiness.findUserById(id);
        resp.status(200).json(user);
    } catch (e) {
        next(e);
    }
}

exports.createUser = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { name, email, password } = req.body;
        const user = await userBusiness.createUser(name, email, password);
        resp.status(201).json(user);
    } catch(e) {
        next(e);
    }
}

exports.updateUser = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = await userBusiness.updateUser(id, name, email, password);
        resp.status(200).json(user);
    } catch (e) {
        next(e);
    }
}

exports.deleteUser = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { id } = req.params;
        await userBusiness.deleteUser(id);
        resp.status(200).json({ msg: "Usuário excluído com sucesso" });
    } catch (e) {
        next(e);
    }
}