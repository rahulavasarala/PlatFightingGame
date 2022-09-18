class CharHandler {

    constructor() {
        this.char_canvas = document.getElementById("character_select_canvas");
        this.char_ctx = this.char_canvas.getContext("2d");

        this.ballx = 300;
        this.bally = 400;
        this.ballxvel = 5;
        this.ballyvel = 5;
    }

    draw() {
        this.char_ctx.fillStyle = "white";
        this.char_ctx.fillRect(0,0,500,500);

        this.char_ctx.fillStyle = "blue";

        this.char_ctx.fillRect(this.ballx, this.bally, 50, 50);
    }

    step() {

        console.log("This is being spammed");
        this.ballx += this.ballxvel;
        this.bally += this.ballyvel;

        if(this.ballx > 430 || this.ballx < 70) {
            this.ballxvel *= -1;
        }

        if (this.bally >430 ||this.bally < 70) {
            this.ballyvel *= -1;
        }

        this.draw();
    }

    




}