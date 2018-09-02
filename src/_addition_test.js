(function () {
    "use strict";
    let addition = require("./addition");

    describe("Addition", function () {
        it("adds positive numbers", function () {
            assertE(addition.add(3, 4), 7);
        });

        it("adds IEEE 754 floating point", function () {
            assertE(addition.add(0.1, 0.2), 0.30000000000000004);
        });
        function assertE(actual, expected) {
            if(actual !== expected)throw new  Error ("expected" + expected + " but found " + actual);
        }
    });

}());