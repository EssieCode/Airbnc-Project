const { fetchReviewsByPropertyId, insertReview } = require("../models/reviews");

exports.getReviewsByPropertyId = async (req, res, next) => {
    const property_id = Number(req.params.id);
    
    const reviews = await fetchReviewsByPropertyId(property_id);

    res.status(200).send({ reviews, average_rating });
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
