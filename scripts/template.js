const logic = require('./logic');
var floorToPixelsFromTop = [500, 400, 300, 200, 100, 0];
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var floorToGo, timeout, direction;
var currentFloor = 0;

function returnKeyByValue(arr, value) {
    return arr.indexOf(value);
}

function timeoutFunction(floor){
    return window.setTimeout(function(){
        drawElevator(floor);
        removeElevatorPreviousStep(floor - 1);
        currentFloor = floor;
        if(floor !== floorToGo) {
            timeoutFunction(returnNextFloor());
        }
    }, 1000);
}

canvas.addEventListener('click', function(e) {
    floorToGo = returnKeyByValue(floorToPixelsFromTop, Math.floor(e.y/100)*100);
    drawQueuedButton(floorToGo);
    drawOpenDoorsIndicator(floorToGo);
    logic.queue(floorToGo);
    timeout = timeoutFunction(returnNextFloor());
});

function returnNextFloor() {
    return currentFloor < floorToGo ? currentFloor + 1 : currentFloor - 1;
}

function handleQueuedButton(floor, fnToExecute) {
    fnToExecute.call(ctx, 25, floorToPixelsFromTop[floor] + 25, 50, 50);
}

function handleOpenDoorsIndicator(floor, fnToExecute, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    fnToExecute.call(ctx, 350, floorToPixelsFromTop[floor] + 50, 25, 0, 2 * Math.PI, false);
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
    ctx.fillStyle = 'gray';
    ctx.fillRect(110, floorToPixelsFromTop[floor] + 10, 180, 80);
}

function removeElevatorPreviousStep(floor) {
    ctx.fillStyle = 'gray';
    ctx.clearRect(110, floorToPixelsFromTop[floor] + 10, 180, 80);
}

logic.queue(0);

drawOutlines();
drawElevator(currentFloor);