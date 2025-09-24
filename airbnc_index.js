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
