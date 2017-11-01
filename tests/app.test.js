var test = require('tape');
var app = require('../scripts/app.js');

test('sum should return the addition of two numbers', function (t) {
    t.equal(3, app.sum(1, 2)); // make this test pass by completing the add function!
    t.end();
});