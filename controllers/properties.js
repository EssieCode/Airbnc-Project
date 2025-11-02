const { fetchProperties, fetchPropertyById } = require("../models/properties");

exports.getProperties = async (req, res, next) => {


    const properties = await fetchProperties();

    if (!properties.length) {
        return res.status(200).send({ properties: [] });
        }
    if( req.path !== "/api/properties") {
        return res.status(404).send({ msg: "404 not found" });
    }

        return res.status(200).send({ properties });
};


exports.getPropertyById = async (req, res, next) => {

    const { id } = req.params;
    
    const property = await fetchPropertyById(id);

    if( !property ) {
        return res.status(400).send({ error: "Bad-request: Incorrect property_id" })
    } else {
        res.status(200).send({ property });
    }

};