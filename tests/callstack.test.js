var test = require('tape');
var callstack = require('../scripts/callstack.js');

test('callstack should have queue function', function (t) {
    t.is(typeof callstack.queue, 'function');
    t.end();
});

test('callstack should have get function', function (t) {
    t.is(typeof callstack.get, 'function');
    t.end();
});

test('callstack should have pop function', function (t) {
    t.is(typeof callstack.pop, 'function');
    t.end();
});

test('get should return an array', function (t) {
    t.looseEqual(callstack.get(), [], 'get returns an array');
    t.end();
});

test('get should return an array with an item, inserted from queue', function (t) {
    var floor = 2;
    callstack.queue(floor);
    t.looseEqual(callstack.get(), [floor]);
    t.end();
});

test('pop function should remove first item from stack array', function (t) {
    var stack = callstack.get();
    var newFloor = 1;
    callstack.queue(newFloor);
    t.looseEqual(callstack.get(), stack.concat(newFloor));
    callstack.pop();
    t.looseEqual(callstack.get(), stack.concat(newFloor).slice(1));
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