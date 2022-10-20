const request = require("supertest");
const { baseUri, basePathUsers } = require("../../app");
const { loginUser } = require("../../utils/login.utils");
const { findUserByEmail } = require("../../dao/users.dao");
const { undefinedToken, invalidToken, emailAlreadyUsed, notFoundUser } = require("../../utils/constant.utils");
const { createUser, updateUser } = require("../../utils/user.utils");

describe("PUT/ User", () => {
    const name = "Automation Test";
    const email = "automation@test.com";
    const password = "123456";
    const updatedName = "Automation Teste Updated";
    const updatedEmail = "automation.updated@test.com";
    const updatedPassword = "654321";

    beforeEach(async () => {
        const user = await createUser(name, email, password);
        global.userId = user.uso_id;

        const token = await loginUser(email, password);
        global.token = token.token;
    });

    it("Update user with success", async () => {
        console.log(`UserId: ${global.userId}, Token: ${global.token}`)
        console.log(`Request: ${baseUri}${basePathUsers}/${global.userId}`)

        const header = {
            "x-session-token": global.token
        };

        const requestBody = {
            name: updatedName,
            email: updatedEmail,
            password: updatedPassword
        };
        
        const response = await request(baseUri).put(`${basePathUsers}/${global.userId}`).send(requestBody).set(header);
        expect(response.statusCode).toBe(200);

        const user = await findUserByEmail(email);
        expect(user.uso_id).toBe(global.userId);
        expect(user.uso_nome).toBe(updatedName);
        expect(user.uso_email).toBe(updatedEmail);
        expect(user.uso_senha).toBe(updatedPassword);
    });

    it("Try to update user using an existing e-mail", async () => {
        const header = {
            "x-session-token": global.token
        };

        const requestBody = {
            name: updatedName,
            email: "fulano@gmail.com",
            password: updatedPassword
        };
        
        const response = await request(baseUri).put(`${basePathUsers}/${global.userId}`).set(header).send(requestBody);
        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toBe(emailAlreadyUsed);
    });

    it("Try to update user without authenticaion token", async () => {
        const response = await request(baseUri).put(basePathUsers);
        expect(response.statusCode).toBe(401);
        expect(response.body.msg).toBe(undefinedToken);
    });

    it("Try to update user with invalid authenticaion token", async () => {
        const header = {
            "x-session-token": "123"
        };

        const response = await request(baseUri).put(`${basePathUsers}/${global.userId}`).set(header);
        expect(response.statusCode).toBe(401);
        expect(response.body.msg).toBe(invalidToken);
    });

    it("Try to update user with nonexistent user Id", async () => {
        const header = {
            "x-session-token": global.token
        };

        const response = await request(baseUri).put(`${basePathUsers}/0`).set(header);
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toBe(notFoundUser);
    });
    
    it("Try to update user with invalid user Id", async () => {
        const userId = "i";

        const header = {
            "x-session-token": global.token
        };

        const response = await request(baseUri).put(`${basePathUsers}/${userId}`).set(header);
        expect(response.statusCode).toBe(404);
        expect(response.body[0].value).toBe(userId);
        expect(response.body[0].msg).toBe("Invalid value");
        expect(response.body[0].param).toBe("id");
        expect(response.body[0].location).toBe("params");
    });

    it("Try to update user without user Id", async () => {
        const header = {
            "x-session-token": global.token
        };

        const response = await request(baseUri).put(basePathUsers).set(header);
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toBe("Invalid e-mail or password");
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
        updateUser(global.userId, global.token, name, email, password);
    });
})