var test = require('tape');
var logic = require('../scripts/logic.js');

test('logic should have queue function', function (t) {
    t.is(typeof logic.queue, 'function');
    t.end();
});

test('logic should have get function', function (t) {
    t.is(typeof logic.get, 'function');
    t.end();
});

test('logic should have pop function', function (t) {
    t.is(typeof logic.pop, 'function');
    t.end();
});

test('get should return an array', function (t) {
    t.looseEqual(logic.get(), [], 'get returns an array');
    t.end();
});

test('get should return an array with an item, inserted from queue', function (t) {
    var floor = 2;
    logic.queue(floor);
    t.looseEqual(logic.get(), [floor]);
    t.end();
});

test('pop function should remove first item from stack array', function (t) {
    var stack = logic.get();
    var newFloor = 1;
    logic.queue(newFloor);
    t.looseEqual(logic.get(), stack.concat(newFloor));
    logic.pop();
    t.looseEqual(logic.get(), stack.concat(newFloor).slice(1));
    t.end();
});

test('logic should not expose local stack array', function (t) {
    t.is(logic.stack, undefined);
    t.end();
});

test('queue function should accept only integers, between 0 and 5', function (t) {
    t.throws(function(){logic.queue('awd')}, 'floor needs to be an int between 0 and 5', 'queue throws, if called with a string');
    t.throws(function(){logic.queue()}, 'floor needs to be an int between 0 and 5', 'queue throws, if called without a param');
    t.throws(function(){logic.queue({string: 'awd'})}, 'floor needs to be an int between 0 and 5', 'queue throws, if given an object');
    t.throws(function(){logic.queue(6)}, 'floor needs to be an int between 0 and 5', 'queue throws, if given an integer above 5');
    t.throws(function(){logic.queue(-1)}, 'floor needs to be an int between 0 and 5', 'queue throws, if given an integer below 0');
    t.doesNotThrow(function() {logic.queue(2)});
    t.end();
});