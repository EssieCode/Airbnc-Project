const db = require("./connection");
const format = require("pg-format");

async function seed(property_types, users, properties) {
    console.log(property_types);
    //drop existing table
    await db.query(`DROP TABLE IF EXISTS properties;`);
    await db.query(`DROP TABLE IF EXISTS users;`);
    await db.query(`DROP TABLE IF EXISTS property_types;`);
    await db.query(`DROP TABLE IF EXISTS reviews;`);
       

    //create properties table
    await db.query(`CREATE TABLE property_types (
        property_type VARCHAR(50) NOT NULL PRIMARY KEY,
        description TEXT NOT NULL
        );`);
    
    //create users table
    await db.query(`CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(40) NOT NULL,
        surname VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        phone_number VARCHAR(50),
        is_host BOOLEAN NOT NULL,
        avatar VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
    
    //create properties table
    await db.query(`CREATE TABLE properties(
        property_id SERIAL PRIMARY KEY,
        host_id INT NOT NULL REFERENCES users(user_id),
        name VARCHAR(50) NOT NULL,
        location VARCHAR(50) NOT NULL,
        property_type VARCHAR(50) NOT NULL REFERENCES property_types(property_type),
        price_per_night DECIMAL NOT NULL,
        description TEXT
        );`);

    //create reviews table
    await db.query(`CREATE TABLE reviews(
        review_id SERIAL PRIMARY KEY,
        property_id INT NOT NULL REFERENCES properties(property_id),
        guest_id INT NOT NULL REFERENCES users(user_id),
        rating INT NOT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);


    //format the data from json
    const formatedPropertyTypeData =  property_types.map(({ property_type, description }) => [
                property_type, description])
    await db.query(
        format(
            `INSERT INTO property_types (property_type, description) VALUES %L`, formatedPropertyTypeData             
        ));

        const returnUsers = await db.query(
        format(
            `INSERT INTO users ( first_name, surname, email, phone_number, is_host, avatar, created_at) VALUES %L RETURNING *`,
             users.map(({ first_name, surname, email, phone_number, is_host, avatar, created_at }) => [
                first_name, surname, email, phone_number, is_host, avatar, created_at])
        ));
        
     await db.query(
        format(
            `INSERT INTO properties (host_id, name, location, property_type, price_per_night, description) VALUES %L`,
             properties.map(({ host_id, name, location, property_type, price_per_night, description }) => [
                host_id, name, location, property_type, price_per_night, description])
        ));
    
    await db.query(
        format(
            `INSERT INTO reviews ( property_id, guest_id, rating, comment, created_at) VALUES %L`,
             reviews.map(({  property_id, guest_id, rating, comment, created_at }) => [
                 property_id, guest_id, rating, comment, created_at])
        ));
        
    //console.log("success!")


}

module.exports = seed;