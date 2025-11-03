const { fetchReviewsByPropertyId, insertReview } = require("../models/reviews");

exports.getReviewsByPropertyId = async (req, res, next) => {
    const property_id = Number(req.params.id);
    console.log(property_id)
    if (isNaN(property_id) || property_id < 1) {
            return res.status(400).send({ error: "Bad request: invalid property_id" });
        }
    
    const reviews = await fetchReviewsByPropertyId(property_id);

    let average_rating = 0;
    if(reviews.length > 0) {
        let total_rating = 0;
        for (let i = 0; i < reviews.length; i++) {
            total_rating += reviews[i].rating;
        }
        let average = total_rating / reviews.length;
        average_rating = Number(average.toFixed(2));
        console.log(average_rating);
    };

    res.status(200).send ({ reviews, average_rating });
};

exports.postReview = async (req, res, next) => {
    const { guest_id, rating, comment } = req.body;
    console.log(guest_id, rating);

    const review = await insertReview(guest_id, rating, comment);

    res.status(201).send({ review });
};

exports.deleteReviewById = async (req, res, next) => {
    const review_id = Number(req.params.id);

    const deleted = await removeReviewById(review_id);

    if (deleted.rows.length === 0) {
        throw { status: 404, msg: "Review not found" };
    }
    res.status(204).send({});
    

}
