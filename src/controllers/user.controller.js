const { response } = require("../app");
 const userBusiness = require("../business/user.business");
 const { validationResult } = require("express-validator");

 exports.updateUser = async (req, resp, next) => {
     try {
         validationResult(req).throw()
         const { id } = req.params;
         const { name, email, password } = req.body;
         await userBusiness.updateUser(id, name, email, password);
         resp.sendStatus(201);
     } catch(e) {
         next(e);
     }
 }