const express = require("express");
const userController = require("../controllers/user.controller");

const userRoutes = express.Router();
const path = "/users";

const { checkSchema } = require("express-validator")
const { createUserSchema, updateUserSchema, deleteUserSchema } = require("./validators/user.route.validators")

userRoutes.post(path, checkSchema(createUserSchema), userController.createUser);
userRoutes.put(`${path}/:id`, checkSchema(updateUserSchema), userController.updateUser);
userRoutes.delete(`${path}/:id`, checkSchema(deleteUserSchema), userController.deleteUser);

module.exports = userRoutes;