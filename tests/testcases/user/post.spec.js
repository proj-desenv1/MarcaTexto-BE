const request = require("supertest");
const { baseUri, basePathUsers } = require("../../app");
const { findUserByEmail, deleteUser } = require("../../dao/users.dao");
const { emailAlreadyUsed } = require("../../utils/constant.utils");

describe("POST/ User", () => {
    const name = "Automation Test";
    const email = "automation@test.com";
    const password = "123456"

    it("Create new user with success", async () => {
        const result = await findUserByEmail(email);
        if (result) {
            await deleteUser(result.uso_id);
        }

        const requestBody = {
            name: name,
            email: email,
            password: password
        };
        
        const response = await request(baseUri).post(basePathUsers).send(requestBody);
        expect(response.statusCode).toBe(201);
        expect(response.body[0].uso_id).not.toBeNull();
        expect(response.body[0].uso_nome).toBe(name);
        expect(response.body[0].uso_email).toBe(email);

        const user = await findUserByEmail(email);
        expect(user.uso_nome).toBe(name);
        expect(user.uso_email).toBe(email);
        expect(user.uso_senha).toBe(password);
    })

    it("Try to create new user using an existing e-mail", async () => {
        const requestBody = {
            name: name,
            email: email,
            password: password
        };
        
        const response = await request(baseUri).post(basePathUsers).send(requestBody);
        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toBe(emailAlreadyUsed);
    })

    it("Try to create new user without request body", async () => {
        const response = await request(baseUri).post(basePathUsers);
        expect(response.statusCode).toBe(404);
        expect(response.body[0].location).toBe("body");
        expect(response.body[0].msg).toBe("Valor inválido para 'name'");
        expect(response.body[0].param).toBe("name");
        expect(response.body[1].location).toBe("body");
        expect(response.body[1].msg).toBe("Valor inválido para 'email'");
        expect(response.body[1].param).toBe("email");
        expect(response.body[2].location).toBe("body");
        expect(response.body[2].msg).toBe("Valor inválido para 'password'");
        expect(response.body[2].param).toBe("password");
    })
})