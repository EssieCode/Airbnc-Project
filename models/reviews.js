const db = require("../db/connection");

exports.fetchReviewsByPropertyId = async (property_id) => {
    
    const { rows: reviews } = await db.query(
        `SELECT review_id, 
        comment, 
        rating, 
        reviews.created_at, 
        CONCAT(first_name, ' ', surname) AS guest
        avatar
        FROM reviews
        JOIN users ON reviews.guest_id = users.user_id
        WHERE property_id= $1`,
        [property_id]
    );
    return reviews;
};


exports.insertReview = async (guest_id, rating, comment) => {
    const { rows: review } = await db.query (
        `INSERT INTO reviews (guest_id, rating, comment) 
        VALUES ($1, $2, $3)
        RETURNING *`,
        [guest_id, rating, comment]
    );
    return review;
}

exports.deleteReviewbyId = async(review_id) => {
    const { rows: review } = await db.query(
        `DELETE FROM reviews 
        WHERE review_id = $1
        RETURNING *`,
        [review_id]
    );

}