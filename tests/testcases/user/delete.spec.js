const request = require("supertest");
const { baseUri, basePathUsers } = require("../../app");
const { findUserById } = require("../../dao/users.dao");
const { notFoundUser } = require("../../utils/constant.utils");
const { loginUser } = require("../../utils/login.utils");
const { createUser } = require("../../utils/user.utils");

describe("DELETE/ User", () => {
    const name = "Automation Test";
    const email = "automation@test.com";
    const password = "123456";

    beforeEach(async () => {        
        const token = await loginUser(email, password);
        global.token = token.token;
    });

    it("Delete user with success", async () => {
        const user = await createUser(name, email, password);
        const userId = user.uso_id;

        const header = {
            "x-session-token": global.token
        };
        
        const response = await request(baseUri).delete(`${basePathUsers}/${userId}`).set(header);
        expect(response.statusCode).toBe(200);

        const database = await findUserById(userId);
        expect(database).toBe(0);
    });

    it("Try to delete user with nonexistent user Id", async () => {
        const header = {
            "x-session-token": global.token
        };

        const response = await request(baseUri).put(`${basePathUsers}/0`).set(header);
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toBe(notFoundUser);
    });

    it("Try to delete user with invalid user Id", async () => {
        const header = {
            "x-session-token": global.token
        };

        const response = await request(baseUri).put(`${basePathUsers}/i`).set(header);
        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toBe("Unidentified error");
    });

    it("Try to delete user without user Id", async () => {
        const header = {
            "x-session-token": global.token
        };

        const response = await request(baseUri).put(basePathUsers).set(header);
        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toBe("Unidentified error");
    });
})