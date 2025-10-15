const db = require("../db/connection");

exports.fetchProperties = async () => {
    try {
    const { rows: properties } = await db.query(
        `SELECT property_id, name AS property_name, location, price_per_night, CONCAT(first_name, ' ', surname) AS host
        FROM properties JOIN users ON host_id = user_id;
        `);

    return properties;
        } catch(error) {
            console.error("Error- no properties fetched", error);
            throw new Error("Error")
        }
};

exports.fetchPropertyById =  async () => {

    const { rows: [property] } = await db.query(
        `SELECT property_id, property_name, location, price_per_night, description, 
        host AS host_name, host_avatar AS avatar 
        FROM properties
        JOIN users ON properties.host_avatar = users.avatar
        WHERE property_id= $1`,
        [id]
    );
    return property;
};

