const request = require("supertest");
const { baseUri, basePathUsers } = require("../../app");
const { findUserByEmail } = require("../../dao/users.dao");
const { loginUser } = require("../../utils/login.utils");
const { createUser } = require("../../utils/user.utils");

describe("PUT/ User", () => {
    const name = "Automation Test";
    const email = "automation@test.com";
    const password = "123456";

    beforeEach(async () => {
        const user = await createUser(name, email, password);
        global.userId = user.uso_id;
        
        const token = await loginUser(email, password);
        global.token = token.token;
    });

    it("Update user with success", async () => {
        const nameUpdated = "Automation Teste Updated";
        const emailUpdated = "automation.updated@test.com";
        const passwordUpdated = "654321"

        const header = {
            "x-session-token": global.token
        };

        const requestBody = {
            name: nameUpdated,
            email: emailUpdated,
            password: passwordUpdated
        };
        
        const response = await request(baseUri).put(`${basePathUsers}/${global.userId}`).send(requestBody).set(header);
        expect(response.statusCode).toBe(200);

        const user = await findUserByEmail(email);
        expect(user.uso_id).toBe(global.userId);
        expect(user.uso_nome).toBe(nameUpdated);
        expect(user.uso_email).toBe(emailUpdated);
        expect(user.uso_senha).toBe(passwordUpdated);
    });

    it("Try to update user using an existing e-mail", async () => {
        const nameUpdated = "Automation Teste Updated";
        const passwordUpdated = "654321";

        const header = {
            "x-session-token": global.token
        };

        const requestBody = {
            name: nameUpdated,
            email: "fulano@gmail.com",
            password: passwordUpdated
        };
        
        const response = await request(baseUri).put(`${basePathUsers}/${global.userId}`).send(requestBody).set(header);
        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toBe("Unidentified error");
    });

    it("Try to update user without authenticaion token", async () => {
        const response = await request(baseUri).put(basePathUsers);
        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toBe("Unidentified error");
    });

    it("Try to update user with invalid authenticaion token", async () => {
        const header = {
            "x-session-token": "123"
        };

        const response = await request(baseUri).put(`${basePathUsers}/${global.userId}`).set(header);
        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toBe("Unidentified error");
    });

    it("Try to update user with invalid user Id", async () => {
        const header = {
            "x-session-token": global.token
        };

        const response = await request(baseUri).put(`${basePathUsers}/i`).set(header);
        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toBe("Unidentified error");
    });

    it("Try to update user without user Id", async () => {
        const header = {
            "x-session-token": global.token
        };

        const response = await request(baseUri).put(basePathUsers).set(header);
        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toBe("Unidentified error");
    });

    it("Try to update user with nonexistent user Id", async () => {
        const header = {
            "x-session-token": global.token
        };

        const response = await request(baseUri).put(`${basePathUsers}/0`).set(header);
        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toBe("Unidentified error");
    });

    it("Try to update user without request body", async () => {
        const header = {
            "x-session-token": global.token
        };

        const response = await request(baseUri).put(`${basePathUsers}/${global.userId}`).set(header);
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
    });

    afterEach(async () => {
        const user = await findUserByEmail(email);
        if (!user) {
            const header = {
                "x-session-token": global.token
            };
    
            const requestBody = {
                name: name,
                email: email,
                password: password
            };
            
            const response = await request(baseUri).put(`${basePathUsers}/${global.userId}`).send(requestBody).set(header);
            expect(response.statusCode).toBe(200);
    
            const user = await findUserByEmail(email);
            expect(user.uso_id).toBe(global.userId);
            expect(user.uso_nome).toBe(name);
            expect(user.uso_email).toBe(email);
            expect(user.uso_senha).toBe(password);
        }
    });
})