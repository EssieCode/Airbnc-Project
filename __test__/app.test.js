const request = require ("supertest");
const app = require("../app.js");
const seed = require("../db/seed.js");
const { propertiesData, propertyTypesData, reviewsData, usersData } = require("../db/data/test")
const db = require("../db/connection");

beforeEach(async () => {
    await seed(propertyTypesData, usersData, propertiesData, reviewsData);
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
        test("404-path not found", async () => {
            const { body } = await request(app).get("/invalid/path").expect(404);
            expect(body.msg).toBe("Path not found.");
        });
    });
    describe("GET/api/properties/{id}", () => {
        test("should respond with status 200", async () => {
            await request(app).get("/api/properties/2").expect(200);

        });
        test("the property object should contain 7 elements", async () => {
            const { 
                body: { property }, 
             } = await request(app).get("/api/properties/1").expect(200);

             expect(Object.keys(property)).toHaveLength(7);
        });
        test("property object has a property_id, name, property_type, location, price_per_night, description, host_name", async () => {
            const { 
                body: { property }, 
             } = await request(app).get("/api/properties/1");

                expect(property).toHaveProperty("property_id", 1);
                expect(property).toHaveProperty("name", "Modern Apartment in City Center");
                expect(property).toHaveProperty("location", "London, UK");
                expect(property).toHaveProperty("price_per_night", "120");//price comes back as string
                expect(property).toHaveProperty("description", "Description of Modern Apartment in City Center.");
                expect(property).toHaveProperty("host_name", "Alice Johnson");
        });
        test("400: Invalid property id", async () => {
            const response = await request(app).get("/api/properties/999999").expect(400);
            expect(response.body.msg).toBe("Bad-request: Incorrect property_id");
        });
    });
    describe("GET/api/properties/{id}/reviews", () => {
        test("should respond with status 200 and the right properties", async () => {
            const { body } = await request(app).get("/api/properties/1/reviews").expect(200);
            body.reviews.forEach(property => {
                expect(property).toHaveProperty("review_id", "2");
                expect(property).toHaveProperty("comment", "Comment about Modern Apartment in City Center");
                expect(property).toHaveProperty("rating", "2");
                expect(property).toHaveProperty("created_at","2024-04-12 14:45:00" );
                expect(property).toHaveProperty("guest", "Bob Smith");
                expect(property).toHaveProperty("avatar", "https://example.com/images/bob.jpg");
        });
        test("should have a property of average rating", async () => {
            const { body } = await request(app).get("api/properties/1/reviews").expect(200)
            expect(body.reviews).toHaveProperty("average_rating");
        });
        test("should return 400 bad request msg for incorrect property_id as input", async() => {
            await request(app).get("api/properties/5555/reviews").expect(400)
            expect(response.body.msg).toBe("Bad-request: Incorrect property_id")
        });
        });
    });
    describe("POST/api/properties/{id}/reviews", () => {
        test("should respond with status 201", async () => {
            const postReview = {
             guest_id: 9,
             rating: 4,
             comment: "Comment about Modern Apartment in City Center"
            }
            await request(app).post("/api/properties/1/reviews").send(postReview);
        });
        test("should respond with newly inserted review with a fresh id", async () => {
            const postReview = {
             guest_id: 9,
             rating: 4,
             comment: "Comment about Modern Apartment in City Center"
            }

            const { body } = await request(app)
                .post("./api/properties/{id}/reviews")
                .send(postReview)
                .expect(201);

            expect(body.review).toEqual({...postReview, review_id: 17})    

        })

    });

});
