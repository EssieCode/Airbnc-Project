const express = require("express")
const { getProperties, getPropertyById } = require("./controllers/properties");
//const { getUsers } = require("./controllers/users");
const { getReviewsByPropertyId, postReviewByPropertyId, deleteReviewById } = require("./controllers/reviews");
const { 
    handlePathNotFound, 
    handleBadRequests, 
    handleCustomsErrors,
    handleServerErrors, 
 } = require("./errors.js");
 const cors = require('cors');
 app.use(cors());

const app = express();

app.use(express.json());

app.get("/api/properties", getProperties);

app.get("/api/properties/:id", getPropertyById);

app.get("/api/properties/:id/reviews", getReviewsByPropertyId);

app.post("/api/properties/:id/reviews", postReviewByPropertyId);

app.delete("/api/reviews/:id", deleteReviewById);

//app.get("/api/users/:id/", getUsers);

app.all("/*all", handlePathNotFound);


app.use(handleBadRequests);
app.use(handleCustomsErrors);
app.use(handleServerErrors);


module.exports = app;
