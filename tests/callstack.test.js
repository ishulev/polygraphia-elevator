var test = require('tape');
var callstack = require('../scripts/callstack.js');

test('callstack should have queue function', function (t) {
    t.isNot(callstack.queue, undefined);
    t.end();
});