const express = require("express");
const userController = require("../controllers/user.controller");

const userRoutes = express.Router();
const path = "/users";

const { checkSchema } = require("express-validator")
const { updateUserSchema } = require("./validators/user.route.validators")

userRoutes.put(`${path}/:id`, checkSchema(updateUserSchema), userController.updateUser);

module.exports = userRoutes;