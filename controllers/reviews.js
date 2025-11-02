const { fetchReviewsByPropertyId, insertReview } = require("../models/reviews");

exports.getReviewsByPropertyId = async (req, res, next) => {
    const { id } = req.params.id;

    const review = await fetchReviewsByPropertyId(id);
    res.status(200).send ({ review, average_rating });
};

exports.postReview = async (req, res, next) => {
    const { guest_id, rating, comment } = req.body;
    console.log(guest_id, rating);

    const review = await insertReview(guest_id, rating, comment);

    res.status(201).send({ review });
};
