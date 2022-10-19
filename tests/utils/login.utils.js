const request = require("supertest");
const { baseUri, basePathLogin } = require("../app");
const { findUserByEmail, deleteUser } = require("../../dao/users.dao");

exports.loginUser = async (email, password) => {
    const requestBody = {
        email: email,
        password: password
    };
    
    return await request(baseUri).post(basePathLogin).send(requestBody);
}