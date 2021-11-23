var canvas; 
var ctx; 
var gameLoop;
var player;
var upKey;
var downKey;
var leftKey;
var rightKey;
var platformArray;

window.onload = function() {
    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");
    setInputs();

    player = new Player(1,1);

    //set the platforms in the platform array
    platformArray = new Array(1);
    platformArray[0] = new Platform(200, 900, 1920-400, 10);//got arrays to work... yay milestone
   

    //create the gameloop
    gameLoop = setInterval(step, 1000/60);
}

function step() {
    player.step();
    draw();
}

function draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,1920,1080);

    for(var i = 0; i < platformArray.length; i++) {
        platformArray[i].draw();
    }

    player.draw();
}

function setInputs() {
    document.addEventListener("keydown", function(event) {
        if(event.key === "w") {
            upKey = true;
        }else if(event.key === "a") {
            leftKey = true;
        }else if(event.key === "s") {
            downKey = true;
        }else if(event.key === "d") {
            rightKey = true; 
        }
    
    });

    document.addEventListener("keyup", function(event) {
        if(event.key === "w") {
            upKey = false;
        }else if(event.key === "a") {
            leftKey = false;
        }else if(event.key === "s") {
            downKey = false;
        }else if(event.key === "d") {
            rightKey = false; 
        }
    
    });
}