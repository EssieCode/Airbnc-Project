const express = require("express");
const db = require("./db/connection");

const app = express();

app.get("/api/properties", async (req, res, next) => {
    const { rows: properties } = await db.query("SELECT * FROM properties;");

    res.status(200).send ({ properties });
});

app.get("/api/properties", async (req, res, next) => {
    const { rows: properties } = await db.query(
        "SELECT * FROM properties WHERE price_per_night > 30 && price_per_night < 200;"
    );

    res.status(200).send ({ properties });
});



module.exports = app;
