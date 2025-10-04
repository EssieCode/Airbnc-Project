const createUserRef = require("../db/utils.js");

describe("convert data from json in data for psql", () => {
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