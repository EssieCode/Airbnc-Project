const db = require("../db/connection");

exports.fetchProperties = async () =>{

    const { rows: properties } = await db.query(
        `SELECT property_id, name AS property_name, location, price_per_night, CONCAT(first_name, ' ', surname) AS host
        FROM properties JOIN users ON host_id = user_id;
        `);
    
    return properties;
};


exports.fetchPropertyById =  async (property_id) => {

    const { rows: [property] } = await db.query(
        `SELECT property_id, name, location, price_per_night, description, 
        CONCAT(first_name, ' ', surname) AS host_name, avatar
        FROM properties
        JOIN users ON properties.host_id = users.user_id
        WHERE property_id= $1`,
        [property_id]
    );
    return property;
};

