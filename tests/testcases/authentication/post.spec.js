const request = require("supertest");
const { baseUri, basePathLogin } = require("../../app");
const { invalidLogin } = require("../../utils/constant.utils");

describe("POST/ Login", () => {
    const email = "fulano@gmail.com";
    const password = "12345"
    
    it("Valid e-mail and password", async () => {
        const requestBody = {
            email: email,
            password: password
        };
        
        const response = await request(baseUri).post(basePathLogin).send(requestBody);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("token");
    })

    it("Try to login with an invalid password", async () => {
        const requestBody = {
            email: email,
            password: "123456"
        };
        
        const response = await request(baseUri).post(basePathLogin).send(requestBody);
        expect(response.statusCode).toBe(401);
        expect(response.body.msg).toBe(invalidLogin);
    })

    it("Try to login with an invalid e-mail", async () => {
        const requestBody = {
            email: "fulano@teste.com",
            password: password
        };
        
        const response = await request(baseUri).post(basePathLogin).send(requestBody);
        expect(response.statusCode).toBe(401);
        expect(response.body.msg).toBe(invalidLogin);
    })

    it("Try to login without request body", async () => {
        const response = await request(baseUri).post(basePathLogin);
        expect(response.statusCode).toBe(404);
        expect(response.body[0].location).toBe("body");
        expect(response.body[0].msg).toBe("Invalid value for 'email'");
        expect(response.body[0].param).toBe("email");
        expect(response.body[1].location).toBe("body");
        expect(response.body[1].msg).toBe("Invalid value for 'password'");
        expect(response.body[1].param).toBe("password");
    })
})