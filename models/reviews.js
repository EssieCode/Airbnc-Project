const db = require("./db/connection");

exports.fetchReviews = async () => {
    
    const { rows: [review] } = await db.query(
        `SELECT review_id, comment, rating, created_at, guest AS guest_name
        FROM reviews
        JOIN users ON reviews.guest_avatar = users.avatar
        WHERE reviews.property_id = $1`,
        [propertyId]
    );
    return getReviews;

};

exports.insertReview = async (guest_id, rating, comment) => {
    const { rows: [property] } = await db.query (
        `INSERT INTO properties (guest_id, rating, comment) VALUES ($1, $2, $3, $4)
        RETURNING review_id, property_id, guest_id, rating, comment, created_at`,
        [guest_id, rating, comment]
    );
    return review;
}