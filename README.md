# AirBNC
Create a database with command CREATE DATABASE airbnc_test;
Check it has been created with \l command and add tables inside database.
Connect with the psql database: import the ps module, create an instance of Pool and confirm the database name.
Send a query to the psql database to retrieve all columns from properties table.
Use a promise to handle the success or errors during the query.

const { Pool } = require ("pg");

require("dotenv").config();

const pool = new Pool({
    database: "airbnc_test_01",
});

pool
    .query("SELECT * FROM properties")
    .then(({ rows }) => {
        console.log(rows);
    })
    .catch(err => {
        console.log(err);
    })
