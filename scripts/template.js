const callstack = require('./callstack');
var reversedFloors = [5, 4, 3, 2, 1, 0];
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var floorToGo, timeout;

function timeoutFunction(){
    return window.setTimeout(function(){
        drawElevator(4);
    }, 1000);
}

canvas.addEventListener('click', function(e) {
    clearQueuedButton(Math.floor(e.y/100) -1 );
    drawQueuedButton(Math.floor(e.y/100));
    drawOpenDoorsIndicator(Math.floor(e.y/100));
    callstack.queue(Math.floor(e.y/100));
    if(!timeout) {
        timeout = timeoutFunction();
    }
});

function handleQueuedButton(floor, fnToExecute) {
    fnToExecute.call(ctx, 25, floor * 100 + 25, 50, 50);
}

function handleOpenDoorsIndicator(floor, fnToExecute, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    fnToExecute.call(ctx, 350, floor * 100 + 50, 25, 0, 2 * Math.PI, false);
    ctx.fill();
}

function drawOpenDoorsIndicator(floor) {
    handleOpenDoorsIndicator(floor, ctx.arc, '#a73e12');
}

function drawQueuedButton(floor) {
    ctx.fillStyle = '#a73e12';
    handleQueuedButton(floor, ctx.fillRect);
}

function clearQueuedButton(floor) {
    handleQueuedButton(floor, ctx.clearRect);
}

function drawOutlines() {
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    (function iterateVertical(iterator){
        ctx.moveTo(iterator * 100, 0);
        ctx.lineTo(iterator * 100, 600);
        if(iterator < 3) {
            iterateVertical(iterator + 2);
        }
    })(1);
    (function iterateHorizontal(iterator){
        ctx.moveTo(0, iterator * 100);
        ctx.lineTo(400, iterator * 100);
        if(iterator < 5) {
            iterateHorizontal(iterator + 1);
        }
    })(1);
    ctx.stroke();
}

function drawElevator(floor) {
    ctx.fillRect(100, floor * 100, 200, 100);
}

callstack.queue(0);

drawOutlines();
drawElevator(5);