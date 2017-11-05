var test = require('tape');
var util = require('../scripts/util.js');

test('util should take only functions for arguments', function (t) {
    t.throws(util(function(){}, 1, []), 'Not all arguments are functions!');
    t.doesNotThrow(util(function(){}, function(){}));
    t.end();
});

test('util should return a function', function (t) {
    t.is(typeof util(), 'function');
    t.end();
});

test('util should return true if all the passed functions return true', function (t) {
    t.is(util(function(){}, function(){})(), false);
    t.is(util(function(){return false;}, function(){return true;})(), false);
    t.is(util(function(){return true;}, function(){return true;})(), true);
    t.end();
});

test('util should return true if all the passed functions return true, given a parameter', function (t) {
    t.is(util(function(param){ return param; }, function(param){ return param;})(true), true);
    t.is(util(function(param){ return !param; }, function(param){ return param;})(true), false);
    t.end();
});