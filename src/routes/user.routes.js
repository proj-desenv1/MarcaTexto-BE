const express = require("express");
const userController = require("../controllers/user.controller");

const userRoutes = express.Router();
const path = "/users";

const { checkSchema } = require("express-validator")
const { deleteUserSchema } = require("./validators/user.route.validators")

userRoutes.delete(`${path}/:id`, checkSchema(deleteUserSchema), userController.deleteUser);

module.exports = userRoutes;