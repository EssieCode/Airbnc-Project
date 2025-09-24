const seed = require("./seed");
const db = require("./connection");
const { property_types, users, properties } = require("./db/data/test");


seed(property_types, users, properties).then(() => {
    db.end();
});