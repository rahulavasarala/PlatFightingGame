function Platform(x, y, width, height, sheildDrop) {
    this.xPos = x;
    this.yPos = y;
    this.width = width;
    this.height = height;
    this.sheildDrop = sheildDrop;

    this.draw = function() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.xPos,this.yPos, this.width, this.height);
    }
}