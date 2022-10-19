const request = require("supertest");
const { baseUri, basePathUsers, basePathLogin } = require("../../app");
const { findUserByEmail, deleteUser } = require("../../dao/users.dao");

describe("DELETE/ User", () => {
    const name = "Automation Test";
    const email = "automation@test.com";
    const password = "123456"

    beforeEach(async () => {
        const user = await createUser(name, email, password);
        global.userId = user.uso_id;
        
        const token = await loginUser(email, password);
        global.token = token.token;
    })

    it("Update new user with success", async () => {
        const header = {
            "x-session-token": global.token
        };

        const requestBody = {
            name: name,
            email: email,
            password: password
        };
        
        const response = await request(baseUri).delete(`${basePathUsers}/${global.userId}`).send(requestBody).set(header);
        expect(response.statusCode).toBe(200);

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
        
        const response = await request(baseUri).delete(basePathUsers).send(requestBody);
        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toBe("Unidentified error");
    })

    it("Try to create new user without request body", async () => {
        const response = await request(baseUri).delete(basePathUsers);
        expect(response.statusCode).toBe(404);
        expect(response.body[0].location).toBe("body");
        expect(response.body[0].msg).toBe("Invalid value for 'name'");
        expect(response.body[0].param).toBe("name");
        expect(response.body[1].location).toBe("body");
        expect(response.body[1].msg).toBe("Invalid value for 'email'");
        expect(response.body[1].param).toBe("email");
        expect(response.body[2].location).toBe("body");
        expect(response.body[2].msg).toBe("Invalid value for 'password'");
        expect(response.body[2].param).toBe("password");
    })
})