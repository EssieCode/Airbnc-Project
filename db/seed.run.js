const seed = require("./seed");
const db = require("./connection");
const { propertyTypesData, usersData, propertiesData } = require("./data/test");


seed(propertyTypesData, usersData, propertiesData).then(() => {
    db.end();
});