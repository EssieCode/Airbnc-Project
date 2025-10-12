const { fetchUsers } = require("../models/users")

exports.getUsers = async(req, res, next) => {
    const { id } = req.params;

    const users = await fetchUsers();

    if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

    res.status(200).send ({ users });
}