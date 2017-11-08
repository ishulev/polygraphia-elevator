var logic = require('./logic');
var floorToPixelsFromTop = [500, 400, 300, 200, 100, 0];
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var floorToGo, timeout, direction;
var currentFloor = 0;

canvas.addEventListener('click', function(e) {
    floorToGo = returnKeyByValue(floorToPixelsFromTop, Math.floor(e.y/100)*100);
    drawQueuedButton(floorToGo);
    drawStickman(floorToGo);
    logic.queue(floorToGo);
    timeout = timeoutFunction(returnNextFloor());
});

function returnKeyByValue(arr, value) {
    return arr.indexOf(value);
}

function timeoutFunction(floor){
    return window.setTimeout(function(){
        drawElevator(floor);
        removeElevatorPreviousStep(currentFloor);
        currentFloor = floor;
        if(floor !== floorToGo) {
            timeoutFunction(returnNextFloor());
        }
        else {
            window.setTimeout(drawOpenDoors(0), 1000);
        }
    }, 1000);
}

function drawOpenDoors(start) {
    function draw(timer) {
        ctx.save();
        var coordinates = [110, floorToPixelsFromTop[currentFloor] + 10, 180, 80];
        if (start === 0) {
            start = timer;
            ctx.clearRect(200, floorToPixelsFromTop[currentFloor] + 20, (timer - start), 60);
            window.requestAnimationFrame(draw);
        }
        else if((timer - start) < 800){
            ctx.clearRect(200 - (timer - start) / 10.25, floorToPixelsFromTop[currentFloor] + 20, (timer - start) / 5.125, 60);
            window.requestAnimationFrame(draw);
        }
        ctx.restore();
    }
    window.requestAnimationFrame(draw);
}

function returnNextFloor() {
    return currentFloor < floorToGo ? currentFloor + 1 : currentFloor - 1;
}

function handleQueuedButton(floor, fnToExecute) {
    fnToExecute.call(ctx, 25, floorToPixelsFromTop[floor] + 25, 50, 50);
}

function drawQueuedButton(floor) {
    ctx.fillStyle = '#a73e12';
    handleQueuedButton(floor, ctx.fillRect);
}

function clearQueuedButton(floor) {
    handleQueuedButton(floor, ctx.clearRect);
}

function drawStickman(floor) {
    ctx.beginPath();
    // lower torso point
    ctx.moveTo(350, floorToPixelsFromTop[floor] + 50);
    ctx.lineTo(330, floorToPixelsFromTop[floor] + 80);
    ctx.moveTo(350, floorToPixelsFromTop[floor] + 50);
    ctx.lineTo(370, floorToPixelsFromTop[floor] + 80);
    ctx.moveTo(350, floorToPixelsFromTop[floor] + 50);
    // special part
    // ctx.lineTo(352, floorToPixelsFromTop[floor] + 65);
    ctx.moveTo(350, floorToPixelsFromTop[floor] + 50);
    // upper torso point
    ctx.lineTo(350, floorToPixelsFromTop[floor] + 30);
    ctx.lineTo(330, floorToPixelsFromTop[floor] + 50);
    ctx.moveTo(350, floorToPixelsFromTop[floor] + 30);
    ctx.lineTo(370, floorToPixelsFromTop[floor] + 50);
    ctx.moveTo(350, floorToPixelsFromTop[floor] + 30);
    // draw the head
    ctx.arc(350, floorToPixelsFromTop[floor] + 15, 9, 1.6, 2 * Math.PI + 1.6, false);
    ctx.stroke();
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