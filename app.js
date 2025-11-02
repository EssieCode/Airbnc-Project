const express = require("express")
const { getProperties, getPropertyById } = require("./controllers/properties");
const { getUsers } = require("./controllers/users");
const { getReviewsByPropertyId, postReview } = require("./controllers/reviews");
const { 
    handlePathNotFound, 
    handleBadRequests, 
    handleServerErrors, 
    handleCustomsErrors,
 } = require("./errors.js")

const app = express();

app.use(express.json());

app.get("/api/properties", getProperties);

app.get("/api/properties/:id", getPropertyById);

app.get("/api/properties/:id/reviews", getReviewsByPropertyId);

app.post("/api/properties/:id/reviews", postReview);

//app.get("/api/users/:id/", getUsers);



app.use(handlePathNotFound);
app.use(handleBadRequests);
app.use(handleServerErrors);
app.use(handleCustomsErrors);

module.exports = app;
