var test = require('tape');
var compose = require('../scripts/compose.js');

test('compose should take only functions for arguments', function (t) {
    t.throws(compose(function(){}, 1, []), 'Not all arguments are functions!');
    t.doesNotThrow(compose(function(){}, function(){}));
    t.end();
});

test('compose should return a function', function (t) {
    t.is(typeof compose(), 'function');
    t.end();
});

test('compose should return true if all the passed functions return true', function (t) {
    t.is(compose(function(){}, function(){})(), false);
    t.is(compose(function(){return false;}, function(){return true;})(), false);
    t.is(compose(function(){return true;}, function(){return true;})(), true);
    t.end();
});

test('compose should return true if all the passed functions return true, given a parameter', function (t) {
    t.is(compose(function(param){ return param; }, function(param){ return param;})(true), true);
    t.is(compose(function(param){ return !param; }, function(param){ return param;})(true), false);
    t.end();
});