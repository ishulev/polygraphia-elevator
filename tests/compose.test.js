var test = require('tape');
var compose = require('../scripts/compose.js');

test('compose should take only functions for arguments', function (t) {
    t.throws(compose(function(){}, 1, []), 'Not all arguments are functions!');
    t.doesNotThrow(compose(function(){}, function(){}));
    t.end();
});