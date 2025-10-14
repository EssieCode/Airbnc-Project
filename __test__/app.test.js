const request = require ("supertest");
const app = require("../app.js");

describe("app", () => {
    describe("GET/api/properties", () => {
        test("responds with status of 200", async() => {

            const response = await request(app).get("/api/properties").expect(200)
        });
        test("responds with an array on the key of properties", async () => {

            const { body } = await request(app).get("/api/properties")
            expect(Array.isArray(body.properties)).toBe(true);
        });
        test("responds with an array of properties with a correct length", async () => {
            const { body } = await request(app).get("/api/properties");
            expect(body.properties.length).toBe(5);
        });
        test("responds with properties objects having the correct structure", async () => {
            const { body } = await request(app).get("/api/properties");
            body.properties.forEach(property => {
                expect(property).toHaveProperty("property_id");
                expect(property).toHaveProperty("property_name");
                expect(property).toHaveProperty("location");
                expect(property).toHaveProperty("price_per_night");
                expect(property).toHaveProperty("host");
            });
            test("responds with 404 if properties not found ", async () => {
                const { body } = await request(app).get("/api/properties");
                expect(body.properties()).toBe("404 Not Found");
            });
        });
    });
});
