const { fetchProperties, fetchPropertyById } = require("../models/properties");

exports.getProperties = async (req, res, next) => {

    const properties = await fetchProperties();

    if (!properties.length) {
        return res.status(200).send({ properties: [] });
        }


        return res.status(200).send({ properties });
};

exports.getPropertyById = async (req, res, next) => {

    const { id } = req.params;
    
    const property = await fetchPropertyById(id);

    if( !property ) {
        return res.status(400).send({ error: "Bad request." })
    } else {
        res.status(200).send({ property });
    }

};