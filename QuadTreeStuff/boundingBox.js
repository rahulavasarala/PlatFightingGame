class BoundingBox {

    /**\
     * the way to define a bounding box is easier by defineing the edges than the points
     */

    constructor(x1,x2,y1, y2) {

        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;

    }


    intersects(bBox) {

        if(this.x2 < bBox.x1 || this.x1 > bBox.x2 || this.y1 > bBox.y2 || this.y2 < bBox.y1) {
            return false;
        }

        return true;
    }

    /**
     * you can get the splitList of a bounding box in a snap
     * @returns 
     */


    fourSplit() {

        var xMid = (this.x1 + this.x2)/2;
        var yMid = (this.y1 + this.y2)/2;

        var splitList = [];
        splitList.push(new BoundingBox(this.x1,xMid, this.y1, yMid));
        splitList.push(new BoundingBox(xMid,this.x2, this.y1, yMid));
        splitList.push(new BoundingBox(this.x1,xMid, yMid, this.y2));
        splitList.push(new BoundingBox(xMid,this.x2, yMid, this.y2));

        return splitList;

    }

    copyOf() {

        return new BoundingBox(this.x1,this.x2,this.y1, this.y2);

    }

    applyTransformation(X1, Y1) {

        var xMid = (this.x1 + this.x2)/2;
        var yMid = (this.y1 + this.y2)/2;

        var xVec = X1 - xMid;
        var yVec = Y1 - yMid;

        this.x1 = this.x1 + xVec;
        this.y1 = this.y1 + yVec;
        this.x2 = this.x2 + xVec;
        this.y2 = this.y2 + yVec;
    }

    drawBorder(ctx) {
        ctx.fillStyle = "black";
 
        var xCoord = this.x1;
        var yCoord = this.y1;

        var width = this.x2-this.x1;
        var height = this.y2 - this.y1;


        ctx.fillRect(xCoord, yCoord, width, height);
        ctx.fillStyle = "white";
        ctx.fillRect(xCoord + 1, yCoord + 1, width- 2,height - 2);
    }

}

