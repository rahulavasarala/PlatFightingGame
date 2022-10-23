var canvas; 
var ctx; 
var gameLoop;
var player1;

var up_button;
var down_button;
var left_button;
var right_button;
var mod1;
var mod2;

window.onload = function() {

    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");

    up_button = new GameButton(false);
    down_button = new GameButton(false);
    left_button = new GameButton(false);
    right_button = new GameButton(false);
    mod1 = new GameButton(false);
    mod2 = new GameButton(false);

    setInputs();

    let button_accordion = new ButtonAccordion(up_button, down_button, left_button, right_button, mod1, mod2);

    let bbox1 = new BoundingBox(50,50);

    player1 = new Player("firstsm.json", button_accordion, bbox1);

    //create the gameloop
    gameLoop = setInterval(step, 1000/60);
}

function step() {
    //console.log("up_button",up_button.valueof())
    player1.tick()


    draw();
}

function draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,1920,1080);

    player1.draw(ctx);
}

function setInputs() {
    document.addEventListener("keydown", function(event) {
        if(event.key === "w") {
            up_button.press();
        }else if(event.key === "a") {
            left_button.press();
        }else if(event.key === "s") {
            down_button.press();
        }else if(event.key === "d") {
            right_button.press();
        }else if(event.key === "g") {
            mod1.press();
        }else if(event.key === "h") {
            mod2.press();
        }
    
    });

    document.addEventListener("keyup", function(event) {
        if(event.key === "w") {
            up_button.release();
        }else if(event.key === "a") {
            left_button.release();
        }else if(event.key === "s") {
            down_button.release();
        }else if(event.key === "d") {
            right_button.release();
        }else if(event.key === "g") {
            mod1.release();
        }else if(event.key === "h") {
            mod2.release();
        }
    
    });
}