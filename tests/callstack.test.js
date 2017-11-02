var test = require('tape');
var callstack = require('../scripts/callstack.js');

test('callstack should have queue function', function (t) {
    t.is(typeof callstack.queue, 'function', 'callstack has a function, called queue');
    t.end();
});

test('callstack should not expose local stack array', function (t) {
    t.is(callstack.stack, undefined);
    t.end();
});

test('queue function should accept only integers, between 0 and 5', function (t) {
    t.throws(function(){callstack.queue('awd')}, 'floor needs to be an int between 0 and 5', 'queue throws, if called with a string');
    t.throws(function(){callstack.queue()}, 'floor needs to be an int between 0 and 5', 'queue throws, if called without a param');
    t.throws(function(){callstack.queue({string: 'awd'})}, 'floor needs to be an int between 0 and 5', 'queue throws, if given an object');
    t.throws(function(){callstack.queue(6)}, 'floor needs to be an int between 0 and 5', 'queue throws, if given an integer above 5');
    t.throws(function(){callstack.queue(-1)}, 'floor needs to be an int between 0 and 5', 'queue throws, if given an integer below 0');
    t.doesNotThrow(function() {callstack.queue(2)});
    t.end();
});