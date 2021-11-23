function Platform(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x,this.y, this.width, this.height);
    }
}