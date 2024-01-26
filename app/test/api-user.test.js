// Constants
const fetch = require("neo-fetch");
const url = process.env.HEROKU || "http://localhost:3000"

// Functions
function filter_by_term(input_array, search_term){
    const regex = new RegExp(search_term, "i");
    return input_array.filter(function(array_element) {
        return array_element.url.match(regex);
    });
}

// Test
describe("text", () => {
    test("tetx", () => {
        // Input values
        const input = [
            {}
        ];

        // Expected output
        const output = [{}];

        // Check if function behaves as intended
        expect(filter_by_term(input, "text")).toEqual(output);
    });
});