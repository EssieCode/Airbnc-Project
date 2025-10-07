const db = require("./connection");
const format = require("pg-format");
const dropTables = require("./drops");
const { createUserRef, getHostName, getHostId } = require("./utils")

async function seed(property_types, users, properties, reviews) {
    
    //drop existing table
    await dropTables();
       
    //create property_types table
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
        host_id INT REFERENCES users(user_id),
        host_name VARCHAR(50) NOT NULL,
        location VARCHAR(50) NOT NULL,
        property_type VARCHAR(50) NOT NULL REFERENCES property_types(property_type),
        price_per_night DECIMAL NOT NULL CHECK (price_per_night > 0),
        description TEXT
        );`);

    //create reviews table
    await db.query(`CREATE TABLE reviews(
        review_id SERIAL PRIMARY KEY,
        property_id INT  REFERENCES properties(property_id),
        guest_id INT REFERENCES users(user_id),
        rating INT NOT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);


    //insert data property_types
    const formatedPropertyTypeData =  property_types.map(({ property_type, description }) => [
                property_type, description])
    
    await db.query(
        format(
            `INSERT INTO property_types (property_type, description) VALUES %L`, 
            formatedPropertyTypeData             
        ));
    //insert data users
    const { rows: insertedUsers } = await db.query(
        format(
            `INSERT INTO users (
             first_name, surname, email, phone_number, is_host, avatar, created_at) VALUES %L RETURNING *`,
             users.map(({ first_name, surname, email, phone_number, is_host, avatar, created_at }) => [
                first_name, surname, email, phone_number, is_host, avatar, created_at])
        ));
        const userRef = createUserRef(insertedUsers);

        console.log(userRef);   
    
    //insert data properties
    const formatedPropertiesData =  properties.map(( { host_id, host_name, location, property_type, price_per_night, description}) => [
                host_id, 
                host_name, 
                location, 
                property_type, 
                price_per_night, 
                description
    ])

    await db.query(
        format(
            `INSERT INTO properties (host_id, host_name, location, property_type, price_per_night, description) VALUES %L`,
             formatedPropertiesData
        ));

        const propertiesRef = getHostName(insertedUsers);
    
    //insert data reviews
    const formatedReviewsData = reviews.map(( { property_id, guest_id, rating, comment, created_at})  => [
                property_id, guest_id, rating, comment, created_at]);

    await db.query(
        format(
            `INSERT INTO reviews (property_id, guest_id, rating, comment, created_at) VALUES %L`,
             formatedReviewsData
        ));
        
        //const {rows } = await db.query("SELECT * FROM users;");
    
        //console.log(rows);


}

module.exports = seed;