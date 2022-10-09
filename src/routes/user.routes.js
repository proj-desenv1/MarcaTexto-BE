const express = require("express");
const userController = require("../controllers/user.controller");

const userRoutes = express.Router();
const path = "/users";

const { checkSchema } = require("express-validator")
const { createUserSchema } = require("./validators/user.route.validators")

userRoutes.post(path, checkSchema(createUserSchema), userController.createUser);

module.exports = userRoutes;