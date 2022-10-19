const request = require("supertest");
const { baseUri, basePathUsers } = require("../app");
const { findUserByEmail } = require("../dao/users.dao");

exports.createUser = async (name, email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        const requestBody = {
            name: name,
            email: email,
            password: password
        };
        
        const response = await request(baseUri).post(basePathUsers).send(requestBody);
        expect(response.statusCode).toBe(201);
    }

    return user;
}