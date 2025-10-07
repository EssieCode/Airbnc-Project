const { createUserRef, getHostName, getHostId }  = require("../db/utils.js");

describe("Users: convert data from json in data for psql", () => {
    test("returns an empty object when passed an empty array", () => {
        expect(createUserRef([])).toEqual({});
        });
    test("assigns user first_name as key on ref object", () => {
        const users = [{ user_id: 1, first_name: "Alice" }];

        const ref = createUserRef(users);
        expect(ref.hasOwnProperty("Alice")).toBe(true); 
    });
     test("assigns users_id as value to user name property", () => {
        const users = [{ user_id: 1, first_name: "Alice" }];

        const ref = createUserRef(users);
        expect(ref["Alice"]).toBe(1); 
    });

    test("assigns multiple key value pairs", () => {
        const users = [
            { user_id: 1, first_name: "Alice" },
            { user_id: 2, first_name: "Bob" },
            { user_id: 3, first_name: "Emma" },
            { user_id: 4, first_name: "Frank" }
        ];

        const ref = createUserRef(users);
        expect(ref).toEqual({
            "Alice": 1,
            "Bob": 2,
            "Emma": 3,
            "Frank": 4
        });
    });

});

describe("Properties: manipulate Host_name from users table", () => {
    test("returns an empty string when passed an empty array", () => {
        expect(getHostName([])).toEqual("");
    });
    test("takes first_name and surname and concatenates both", () => {
        const host_names = [
            { first_name: "Alice", surname: "Johnson" },
            { first_name: "Bob", surname: "Smith" },
        ];

        expect(getHostName(host_names)).toEqual([
            "Alice Johnson",
            "Bob Smith"
        ]);
    });
    test("if first_name or surname is missing, return the present", () => {
        const host_names = [
            { first_name: "", surname: "Johnson"},
            { first_name: "Bob", surname: ""},
        ];
        expect(getHostName(host_names)).toEqual(["Johnson", "Bob"]);
    });
    test("if first_name and surname is missing, return Unknown Host", () => {
        const host_names = [
            { first_name: "", surname: ""},
        ];
        expect(getHostName(host_names)).toEqual(["Unknown Host"]);
    })
});

describe.only("assigns user_id to host_id", () => {
    test("takes a users_id and asigns it to a host_id", () => {

        const testIs = [
            ["Alice Johnson", 1],
            ["Bob Smith", 2],
            ["Emma Davies", 3]
        ]
        expect(getHostId(user_name)).toBe()
    });
})