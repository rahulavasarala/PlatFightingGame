var canvas; 
var ctx; 
var gameLoop;
var player;
var platformArray;

/**
 * over here, i wanna make all the buttons that are going to be watched and inputted into
 * the buttonAccordion, which will then be put in the player
 * 
 * 
 * buttonW
 * buttonA
 * buttonS
 * buttonD
 * ...
 */

var wButton;
var aButton;
var sButton;
var dButton;
var gButton;

window.onload = function() {
    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");

    wButton = new GameButton();
    aButton = new GameButton();
    sButton = new GameButton();
    dButton = new GameButton();
    gButton = new GameButton();

    setInputs();

    var p1ButtonAccordion = new ButtonAccordion(wButton, sButton, aButton, dButton, gButton);

    var p1StateMachine = new StateMachine();
    p1StateMachine.initializeStateArray();

    player = new Player(1,1, p1ButtonAccordion, p1StateMachine);

    platformArray = [new Platform(200, 900, 1920-400, 10, false), new Platform(200, 600, 400, 10, false), new Platform(1920-800 + 200, 600, 400, 10, false)];
   
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
            wButton.press();
        }else if(event.key === "a") {
            aButton.press();
        }else if(event.key === "s") {
            sButton.press();
        }else if(event.key === "d") {
            dButton.press();
        }else if(event.key === "g") {
            gButton.press();
        }
    
    });

    document.addEventListener("keyup", function(event) {
        if(event.key === "w") {
            wButton.release();
        }else if(event.key === "a") {
            aButton.release();
        }else if(event.key === "s") {
            sButton.release();
        }else if(event.key === "d") {
            dButton.release();
        }else if(event.key === "g") {
            gButton.release();
        }
    
    });
}