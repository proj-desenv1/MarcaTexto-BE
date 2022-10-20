const request = require("supertest");
const { baseUri, basePathLogin } = require("../app");

exports.loginUser = async (email, password) => {
    const requestBody = {
        email: email,
        password: password
    };
    
    const response = await request(baseUri).post(basePathLogin).send(requestBody);
    expect(response.statusCode).toBe(201);

    return response.body
}