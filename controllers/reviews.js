const { fetchReviews, insertReview } = require("../models/reviews");

exports.getReviews = async (req, res, next) => {
    //const propertyId = req.params.id;

    const reviews = await fetchReviews();

    res.status(200).send ({ reviews });
};

exports.postReview = async (req, res, next) => {
    const { guest_id, rating, comment } = req.body;

    const review = await insertReview(guest_id, rating, comment);

    res.status(201).send ({ review });
};