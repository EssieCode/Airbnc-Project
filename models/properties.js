const db = require("./db/connection");

exports.fetchProperties = async () => {
    const { rows: properties } = await db.query(
        `SELECT property_id, property_name AS name, location, price_per_night, host_name
        FROM properties
        `);

    return properties;
}

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

