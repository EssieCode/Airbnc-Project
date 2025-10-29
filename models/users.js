const db = require("../db/connection");

exports.fetchUsers =  async (user_id) => {

    const { rows: [user] } = await db.query(
        `SELECT user_id, first_name, surname, email, phone_number, avatar, created_at
        FROM users
        WHERE user_id = $1`,
        [user_id]
    );
    return users;
}