function createUserRef(users) {
    const ref = {};
    
    if (users.length === 0) return ref;

    users.forEach((user)=> {
        ref[user.first_name] = user.user_id;
    });
    return ref;
}

module.exports = createUserRef;