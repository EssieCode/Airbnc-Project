const seed = require("./seed");
const db = require("./connection");
const { propertyTypesData, usersData, propertiesData, reviewsData } = require("./data/test");


seed(propertyTypesData, usersData, propertiesData, reviewsData).then(() => {
    db.end();
});