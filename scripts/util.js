function allFunctionArguments(args) {
    return (function iterate(iterator){
        if (typeof args[iterator] !== 'function') {
            return false;
        }
        if(iterator < args.length) {
            iterate(iterator + 1);
        } else {
            return true;
        }
    })(0);
}

module.exports = function pipe() {
    // Make array-like 'arguments' into an array
    // This needs Array.prototype, because arguments is not an array
    // so I guess coersion happens
    var pipeArguments = Array.prototype.slice.call(arguments);
    if(!allFunctionArguments) {
        throw 'Not all arguments are functions!';
    }

    return function(valueToCheck) {
        return pipeArguments.reduce(
            function (accumulator, individualFunction) {
                return accumulator + individualFunction.call(
                    null, valueToCheck
                );
            },
        0) === pipeArguments.length;
    }
};