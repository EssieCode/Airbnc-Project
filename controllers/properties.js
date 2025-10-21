const { fetchProperties, fetchPropertyById } = require("../models/properties");

exports.getProperties = async (req, res, next) => {

    try {
    const properties = await fetchProperties();

    if (!properties.length) {
        return res.status(200).send({ properties: [] });
        }
    if( req.path !== "/api/properties") {
        return res.status(404).send({ msg: "404 not found" });
    }

        return res.status(200).send({ properties });

    } catch (error) {
    console.log("Error in fetching the properties:", error);
        return res.status(500).send({ message: "Server Error" });
    }
};


exports.getPropertyById = async (req, res, next) => {

    const { id } = req.params;
    
    const property = await fetchPropertyById(id);

    res.status(200).send({ property });
};