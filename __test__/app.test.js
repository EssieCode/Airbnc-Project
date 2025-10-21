const request = require ("supertest");
const app = require("../app.js");
const seed = require("../db/seed.js");
const { properties, reviews, users } = require("../db/data/test")
const test = require("supertest/lib/test.js");
const db = require("../db/connection");

beforeEach(async () => {
    await seed(properties, reviews, users);
});

afterAll(() => {
    db.end();
});

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
            expect(body.properties.length).toBe(11);
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
            
        });
        test.only("404-path not found", async () => {
            const { body } = await request(app).get("/invalid/path").expect(404);
            expect(body.msg).toBe("Path not found.");
        });
    });
    describe.only("GET/api/properties/{id}", () => {
        test("400: Invalid property id", async () => {
            const response = await request(app).get("/api/properties/999999").expect(400);
            expect(response.body.msg).toBe("Bad-request: Incorrect property_id");

        });
        test("should respond with status 200", async () => {
            const response = await request(app).get("/api/properties/2").expect(200);

        });
        test("responds with an array on the key of properties", async () => {
            const { body } = await request(app).get("/api/properties/1");
            
            expect(Array.isArray(body.properties)).toBe(true);
        });
        test("the array should contain 8 keys", async () => {
            const { 
                body: { property }, 
             } = await request(app).get("/api/properties/1").expect(200);

             expect(Object.keys(property)).toHaveLength(8);
        });
        test("property object has a property_id, name, property_type, location, price_per_night, description, host_name, amenities", async () => {
            const { 
                body: { property }, 
             } = await request(app).get("/api/properties/1");

                expect(property).toHaveProperty("property_id", 1);
                expect(property).toHaveProperty("name", "Modern Apartment in City Center");
                expect(property).toHaveProperty("property_type", "Apartment");
                expect(property).toHaveProperty("location", "London, UK");
                expect(property).toHaveProperty("price_per_night", 120.0);
                expect(property).toHaveProperty("description", "Description of Modern Apartment in City Center.");
                expect(property).toHaveProperty("host_name", "Alice Johnson");
                expect(property).toHaveProperty("amenities", ["WiFi", "TV", "Kitchen"]);
        });
    });

    
});
