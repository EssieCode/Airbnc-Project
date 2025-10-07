function createUserRef(users) {
    const ref = {};
    
    if (users.length === 0) return ref;

    users.forEach((user)=> {
        ref[user.first_name] = user.user_id;
    });
    return ref;
}


function getHostName(users) {
    if(!users || users.length === 0) return "";

    return users.map(user => {
        if (!user.first_name && !user.surname){
            return "Unknown Host"
        }
        if(user.first_name && user.surname) {
            return `${user.first_name} ${user.surname}`;
        }
        if (user.first_name) {
            return user.first_name;
        }
        if ( user.surname) {
            return user.surname;
        }
        
    });

};

function getHostId(users) {
    const hosts = [        
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Emma Davies" }
    ]
    
    return hosts[users];
    

}

module.exports = { createUserRef, getHostName, getHostId } ;