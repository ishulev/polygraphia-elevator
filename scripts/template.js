const logic = require('./logic');
var reversedFloors = [5, 4, 3, 2, 1, 0];
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var floorToGo, timeout;
var currentFloor = 0;

function timeoutFunction(floor){
    return window.setTimeout(function(){
        drawElevator(floor);
        currentFloor = reversedFloors[floor];
        if(floor !== floorToGo) {
            timeoutFunction(reversedFloors[currentFloor] - 1);
        }
    }, 1000);
}

canvas.addEventListener('click', function(e) {
    floorToGo = Math.floor(e.y/100);
    clearQueuedButton(floorToGo - 1);
    drawQueuedButton(floorToGo);
    drawOpenDoorsIndicator(floorToGo);
    logic.queue(floorToGo);
    if(!timeout) {
        timeout = timeoutFunction(reversedFloors[currentFloor] - 1);
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
    ctx.fillStyle = 'gray';
    ctx.fillRect(110, floor * 100 + 10, 180, 80);
}

logic.queue(0);

drawOutlines();
drawElevator(reversedFloors[currentFloor]);