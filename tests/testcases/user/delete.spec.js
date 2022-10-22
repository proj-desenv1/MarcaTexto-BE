const request = require("supertest");
const { baseUri, basePathUsers } = require("../../app");
const { countUserByEmail } = require("../../dao/users.dao");
const { notFoundUser, userDeleted } = require("../../utils/constant.utils");
const { loginUser } = require("../../utils/login.utils");
const { createUser } = require("../../utils/user.utils");

describe("DELETE/ User", () => {
    const name = "Automation Test";
    const email = "automation@test.com";
    const password = "123456";

    beforeAll(async () => {
        const user = await createUser(name, email, password);
        global.userId = user;

        const token = await loginUser(email, password);
        global.token = token.token;
    });

    it("Delete user with success", async () => {
        const header = {
            "x-session-token": global.token
        };
        
        const response = await request(baseUri).delete(`${basePathUsers}/${global.userId}`).set(header);
        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toBe(userDeleted);

        const database = await countUserByEmail(email);
        expect(database.cont).toBe("0");
    });

    it.skip("Try to delete user with nonexistent user Id", async () => {
        const header = {
            "x-session-token": global.token
        };

        const response = await request(baseUri).put(`${basePathUsers}/0`).set(header);
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toBe(notFoundUser);
    });

    it("Try to delete user with invalid user Id", async () => {
        const userId = "i";

        const header = {
            "x-session-token": global.token
        };

        const response = await request(baseUri).put(`${basePathUsers}/${userId}`).set(header);
        expect(response.statusCode).toBe(404);
        expect(response.body[0].value).toBe(userId);
        expect(response.body[0].msg).toBe("Valor inválido");
        expect(response.body[0].param).toBe("id");
        expect(response.body[0].location).toBe("params");
    });
})