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
    describe("GET/api/reviews", () => {
        test("responds with status of 200", async() => {
            const response = await request(app).get("/api/reviews").expect(200)
        });
        test("responds with an array on the key of reviews", async () => {

            const { body } = await request(app).get("/api/reviews")
            expect(Array.isArray(body.reviews)).toBe(true);
        });
        test("responds with an array of properties with a correct length", async () => {
            const { body } = await request(app).get("/api/reviews");
            expect(body.reviews.length).toBe(16);
        });
        test("responds with properties objects having the correct structure", async () => {
            const { body } = await request(app).get("/api/reviews");
            body.reviews.forEach(property => {
                expect(property).toHaveProperty("review_id");
                expect(property).toHaveProperty("comment");
                expect(property).toHaveProperty("rating");
                expect(property).toHaveProperty("created_at");
                expect(property).toHaveProperty("guest");
                expect(property).toHaveProperty("guest_avatar");
            });
        });
        test("404-path not found", async () => {
            const { body } = await request(app).get("/invalid/path").expect(404);
            expect(body.msg).toBe("Path not found.");
        });
        test("Reviews should come back ordered by latest to oldest by default.", async () => {
            const dates = body.reviews.map(review => new Date(review.created_at));
            const sortedDates = dates.sort((a, b) => a - b)
            expect(dates).toEqual(sortedDates);
        });
    });
    describe("POST/api/properties/:id/reviews", () => {
            test("should respond with status 201", async () => {
                const testReview = { review_id: "id", property_id: "id", rating: "rating", comment: "comment", created_at: "date"};
                await request(app).post("/api/reviews")
            });
            test("should respond with newly inserted review with new id", () => {
                const newReview = { guest_id: 2, rating: 8, comment: "lovely view and very comfy"}
            });
            test("body should have the property of rating", () => {
                expect(body).toHaveProperty("rating")
            });
            test("should respond with 400 and error message if rating is not a number", async() => {
                const incorrectReview = {
                    guest_id: 3,
                    rating: "Great",
                    comment: "lovely view and very comfy"};
                const { body } = await request(app)
                    .post("/api/reviews")
                    .send(incorrectReview)
                    .expect(400);
                    expect(body.msg).toBe("Rating incorrect. Rating should be a number")
            });
    });
    describe.only("GET/api/users/{id}", () => {
        test("400: Invalid property id", async () => {
            const response = await request(app).get("/api/users/999999").expect(400);
            expect(response.body.msg).toBe("Bad-request: Incorrect user_id");

        });
        test("should respond with status 200", async () => {
            const response = await request(app).get("/api/users/1").expect(200);

        });
        test("responds with an array on the key of user", async () => {
            const { body } = await request(app).get("/api/users/1").expect(200);
            
            expect(Array.isArray(body.user)).toBe(true);
        });
        test("the user list should contain 8 keys", async () => {
            const { 
                body: { user }, 
             } = await request(app).get("/api/users/1").expect(200);

             expect(Object.keys(user)).toHaveLength(8);
        });
        test("property object has a user_id, first_name, surname, email, phone_number, avatar, created_at", async () => {
            const { 
                body: { user }, 
             } = await request(app).get("/api/users/1");

                expect(user).toHaveProperty("user_id", 1);
                expect(user).toHaveProperty("first_name", "Alice");
                expect(user).toHaveProperty("surname", "Johnson");
                expect(user).toHaveProperty("email", "alice@example.com");
                expect(user).toHaveProperty("avatar", "https://example.com/images/alice.jpg");
                expect(user).toHaveProperty("created_at");
        });
    });
    

    
});
