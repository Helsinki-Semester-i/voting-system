var assert = require('assert');
var operations = require('../app/operations.js');

describe("Operations of numbers", function() {
    describe("Addition", function() {
        it("Add two numbers", function() {
            var z = operations.sum(1, 2);
            assert.equal(z, 3);
        });
    });

    describe("Substraction", function() {
        it("Substract two numbers", function() {
            var z = operations.substract(2, 1);
            assert.equal(z, 1);
        });
    });
});