const express = require("express");
const userController = require("../controllers/user.controller");
const auth = require('../controllers/utils/validate-token');

const userRoutes = express.Router();
const path = "/users";

const { checkSchema } = require("express-validator")
const { getUserSchema, createUserSchema, updateUserSchema } = require("./validators/user.route.validators")

userRoutes.get(`${path}/:id`, checkSchema(getUserSchema), auth.tokenValidation, userController.findUserById);
userRoutes.post(path, checkSchema(createUserSchema), userController.createUser);
userRoutes.put(`${path}/:id`, checkSchema(updateUserSchema), auth.tokenValidation, userController.updateUser);
userRoutes.delete(`${path}/:id`, checkSchema(getUserSchema), auth.tokenValidation, userController.deleteUser);

module.exports = userRoutes;