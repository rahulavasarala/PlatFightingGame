class GameHandler {

    constructor() {
        this.game_canvas = document.getElementById("game_canvas");
        this.game_ctx = this.game_canvas.getContext("2d")

        this.ballx = 100;
        this.bally = 100;
        this.ballxvel = 5;
        this.ballyvel = 5;
    }


    draw() {
        this.game_ctx.fillStyle = "white";
        this.game_ctx.fillRect(0,0,500,500);
        this.game_ctx.fillStyle = "blue";

        this.game_ctx.fillRect(this.ballx, this.bally, 50, 50);
    }

    step() {
        //will update the ball's position, and then act smart
        console.log("This is being spammed");

        this.ballx += this.ballxvel;
        this.bally += this.ballyvel;

        if(this.ballx > 430 || this.ballx < 70) {
            this.ballxvel *= -1;
        }

        if (this.bally >430||this.bally < 70) {
            this.ballyvel *= -1;
        }

        this.draw();


    }

    




}