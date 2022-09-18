var canvas; 
var ctx; 
var gameLoop;
var gameElementArr;
var qT;

/**
 * Basically what i want to do is initialize a bunch of elements to go in random directions with random speeds.
 * Then i want to draw the quad tree bounding boxes to actually showcase my quadtree working
 * go to each element, see the node that they are in, and draw the node's bounding boxes outline
 */

 window.onload = function() {
    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");

    //gameElementArr will have all the objects, and in the step function, it will update the position of all the objects in the array

    var ge0 = new gameElement(20, 30, new BoundingBox(0,25, 0, 25), 1,2);
    var ge1 = new gameElement(100, 30, new BoundingBox(0,25, 0, 25), 3, 1);
    var ge2 = new gameElement(200, 30, new BoundingBox(0,25, 0, 25), 2 , 2);
    var ge3 = new gameElement(400, 30, new BoundingBox(0,25, 0, 25), 1,2);
    var ge4 = new gameElement(200, 30, new BoundingBox(0,25, 0, 25), 3, 1);
    var ge5 = new gameElement(250, 30, new BoundingBox(0,25, 0, 25), 2 , 2);
    var ge6 = new gameElement(150, 30, new BoundingBox(0,25, 0, 25), 1,2);
    var ge7 = new gameElement(150, 150, new BoundingBox(0,25, 0, 25), 3, 1);
    var ge8 = new gameElement(200, 150, new BoundingBox(0,25, 0, 25), 2 , 2);
    var ge9 = new gameElement(300, 150, new BoundingBox(0,25, 0, 25), 1,2);
    var ge10 = new gameElement(120, 120, new BoundingBox(0,25, 0, 25), 3, 1);
    var ge11 = new gameElement(350, 350, new BoundingBox(0,25, 0, 25), 2 , 2);

    gameElementArr = [];
    gameElementArr.push(ge0);
    gameElementArr.push(ge1);
    gameElementArr.push(ge2);
    gameElementArr.push(ge3);
    gameElementArr.push(ge4);
    gameElementArr.push(ge5);
    gameElementArr.push(ge6);
    //gameElementArr.push(ge7);
    //gameElementArr.push(ge8);
    //gameElementArr.push(ge9);
    //gameElementArr.push(ge10);
    //gameElementArr.push(ge11);


    qT = new QuadTree(new BoundingBox(0,500, 0, 500));
    qT.quadAdd(ge0);
    qT.quadAdd(ge1);
    qT.quadAdd(ge2);
    qT.quadAdd(ge3);
    qT.quadAdd(ge4);
    qT.quadAdd(ge5);
    qT.quadAdd(ge6);
    //qT.quadAdd(ge7);
    //qT.quadAdd(ge8);
    //qT.quadAdd(ge9);
    //qT.quadAdd(ge10);
    //qT.quadAdd(ge11);


    //create the gameloop
    gameLoop = setInterval(step, 1000/15);//finally understand how this works
}

//The position of the players that the tree thinks they are at are shifted by a diagonal vector
//first i need to fix the graphics display 
//fixed that

function step() {
    gameElUpdate();
    updateElementsInQT();

    draw();
    

    
}

function draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,500,500);
    drawBoundingBoxes();
    drawGameElements();
   
}

/**
 * Updates the position of each of the elements in the gameElementArr array
 */

function gameElUpdate() {//working flawlessly
    for(var i = 0; i< gameElementArr.length; i++) {
        if(gameElementArr[i].xPos > 487.5) {
            gameElementArr[i].xPos = 487;
            gameElementArr[i].xSpeed *= -1;
        }else if(gameElementArr[i].xPos < 12.5) {
            gameElementArr[i].xPos = 12.5;
            gameElementArr[i].xSpeed *= -1;
        }

        if(gameElementArr[i].yPos > 487.5) {
            gameElementArr[i].yPos = 487.5;
            gameElementArr[i].ySpeed *= -1;
        }else if(gameElementArr[i].yPos < 12.5) {
            gameElementArr[i].yPos = 12.5;
            gameElementArr[i].ySpeed *= -1;
        }

        console.log(i);

        gameElementArr[i].xPos += gameElementArr[i].xSpeed;
        gameElementArr[i].yPos += gameElementArr[i].ySpeed;
    }
}

function updateElementsInQT() {
    for(var i = 0; i<gameElementArr.length; i++) {
        qT.quadUpdate(gameElementArr[i]);
    }
}

function drawBoundingBoxes() {
    qT.print();
}

function drawGameElements() {//working
    for(var i = 0; i< gameElementArr.length; i++) {
        ctx.fillStyle = "green";
        var width = gameElementArr[i].boundingBox.x2 - gameElementArr[i].boundingBox.x1;
        var height = gameElementArr[i].boundingBox.y2 - gameElementArr[i].boundingBox.y1;
        ctx.fillRect(gameElementArr[i].xPos- width/2, gameElementArr[i].yPos - height/2, width, height);
    }
}

