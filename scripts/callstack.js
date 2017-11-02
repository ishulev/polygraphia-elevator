const compose = require('./compose');
const stack = [];
const isNextFloorValid = compose(isNumber, isBetweenTheRightValues);

function isNumber(int) {
    return typeof int === 'number';
}

function isBetweenTheRightValues(int) {
    return int < 6 && int > -1;
}

function queue(nextFloor) {
    if(!isNextFloorValid(nextFloor)) {
        throw 'floor needs to be an int between 0 and 5';
    }
    stack.push(nextFloor);
}

function get() {
    return stack.slice();
}

function pop() {
    stack.shift();
}

module.exports = {
    queue,
    get,
    pop
};