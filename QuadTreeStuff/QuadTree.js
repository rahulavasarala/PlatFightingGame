class QuadTree {
    constructor(areaBox) {
        this.size = 0;
        this.root = new quadNode(areaBox, null,null, 1);
    }

    quadInit(playerArray, platformArray) {
        for(var i = 0; i< playerArray.length; i++) {
            this.quadAdd(playerArray[i]);
        }
        for(var i = 0; i < platformArray.length; i++) {
            this.quadAdd(platformArray[i]);
        }
    }

    /**
     * this function adds a player or platform or any game element into the tree and returns void
     * @param {*} gameElement 
     */

    quadAdd(gameElement) {
        
        this.root = this.quadAddHelper(this.root, gameElement);

    }

    /**
     * this function recursively adds an element into a quadNode by adding it into its children and returning the node itself
     * completely agree with the code in here
     * @param {*} quadNode 
     * @param {*} gameElement 
     * @returns 
     */

    quadAddHelper(q, gameElement) {

        if(q.isBrokenUp() == false && q.getCapacity() < q.elementThreshhold) {
            q.addElement(gameElement);
            gameElement.quadLocList.push(q);
            return q;
        }else if(q.isBrokenUp() == false && q.getCapacity() >= q.elementThreshhold) {
            //re-add everything and return the node imediately
            q.addElement(gameElement);
            q = this.subdivide(q);
            return q;
        }

        if(q.isBrokenUp()) {
            //compute the quadrants in which the element interesects with the split list
            //then recursively add the node inside each of the child of the nodes

            var splitList = q.areaBox.fourSplit();
            var zoneList = q.determineZone(gameElement);

            for(var i = 0; i<zoneList.length; i++) {
                if(q.nodeList[zoneList[i]] == null) {
                    q.nodeList[zoneList[i]] = new quadNode(splitList[zoneList[i]], q, zoneList[i], q.depth + 1);
                    //do the parent shenanigans over here
                }

                q.nodeList[zoneList[i]] = this.quadAddHelper(q.nodeList[zoneList[i]], gameElement);
            }
        }

        return q;

    }

    /**
     * the skeleton of this function is implemented
     */

    quadRemove(gameElement) {

        var locList = gameElement.quadLocList;

        for(var i = 0; i< locList.length; i++) {
            console.log("I = "+ i+ "len = " + locList[i].elementList.length);
            var index = locList[i].elementList.indexOf(gameElement);

            if(index != -1) {
                locList[i].elementList.splice(index, 1);
            }
            
            var position = locList[i].position;
            console.log("I = "+ i+ "len = " + locList[i].elementList.length);
            this.cleanUp(locList[i].parent, position);
        }

        gameElement.quadLocList = [];

    }

    /**
     * Clean representation of the update function
     * I am coding in functions before I actually implement them to get a more intuitive feel of what they do
     * @param {*} gameElement 
     */
    
    quadUpdate(gameElement) {
        this.quadRemove(gameElement);
        this.quadAdd(gameElement);
        //remove all occurences of the gameElement in the 
    }

    /**
     * This method nicely subdivides a node and makes the naive assumption of only subdividing one time
     * whenever subdivide is run, you wanna push to the quadLocList of each element the node pointer
     * @param {*} quadNode 
     * @returns 
     */

    subdivide(q) {

        var splitList = q.areaBox.fourSplit();

        for(var i = 0; i<q.elementList.length; i++) {
            var currElement = q.elementList[i];
            var nodeIndex = currElement.quadLocList.indexOf(q);
            if(nodeIndex != -1) {
                currElement.quadLocList.splice(nodeIndex, 1);
            }

            var touchingList = q.determineZone(currElement); 
            
            for(var j = 0; j< touchingList.length; j++) {
                if(q.nodeList[touchingList[j]] == null) {
                    q.nodeList[touchingList[j]] = new quadNode(splitList[touchingList[j]], q, touchingList[j], q.depth + 1);
                }

                q.nodeList[touchingList[j]].addElement(q.elementList[i]);
                q.elementList[i].quadLocList.push(q.nodeList[touchingList[j]]);
            }
        }

        //empty out the list that quadNode has and set it off as brokenUp == true

        q.elementList = [];
        q.setBrokenUp(true);
        return q;
    }

    /**
     * the reason why clean up should be here is because you are trying to clean the datastructure and not the node itself
     * the good news is that the cleanup method actually works
     * 
     */

    cleanUp(q, position) {
        if(q != null && q.nodeList[position] != null && q.nodeList[position].elementList.length == 0) {
            q.nodeList[position] = null;
            console.log("cleanup was called!!!");
        }
    }



    /**
     * Print will print out the population of the quadtree by  quadnode, printing top left then right
     * should work
     */

    print() {
        this.printHelper(this.root);
    }

    printHelper(q) {
        if(q == null) {
            return;
        }

        canvas = document.getElementById("game-canvas");
        ctx = canvas.getContext("2d");
        if(q.elementList.length != 0) {
            q.areaBox.drawBorder(ctx);
        }
       
        ctx.font = '10px serif';
        ctx.fillStyle = "black";

        if(q.elementList.length != 0) {
            ctx.fillText(q.elementList.length, (q.areaBox.x1 + q.areaBox.x2)/ 2, (q.areaBox.y1 + q.areaBox.y2)/2);
        }
       

        console.log("dep = " + q.depth +", pos = " + q.position+  ", numEl:"+ q.elementList.length + ", isBroc = " + q.isBrokenUp()); //console.log already println

        for(var i = 0; i< 4; i++) {
            this.printHelper(q.nodeList[i]);
        }

    }

    

}

/**
 * this is a cleanly built class
 */

class quadNode {
    constructor(boundingBox, parent, position, depth) {
        this.nodeList = new Array(4);
        this.parent = parent;
        this.position = position;
        this.brokenUp = false;
        this.elementList = [];
        this.elementThreshhold = 4;
        this.areaBox = boundingBox;
        this.depth = depth;
    }

    /**
     * the convention is 1 lu, 2 ru, 3 ll, 4 rl
     * this method will have a node with a bounding box, and sees which out of the 4
     * sub boxes touch the game element
     * @param {} gameElement 
     */


    determineZone(gameElement) {

        var zoneList = [];
        var pBB = gameElement.boundingBox.copyOf();
        pBB.applyTransformation(gameElement.xPos, gameElement.yPos);

        var splitList = this.areaBox.fourSplit();

        for(var i = 0; i< splitList.length; i++) {
            if(splitList[i].intersects(pBB)) {
                zoneList.push(i);
            }
        }

        return zoneList;
    }

    getCapacity() {
        return this.elementList.length;

    }

    isBrokenUp() {
        return this.brokenUp;
    }

    setBrokenUp(bool) {
        this.brokenUp = bool;
    }
    
    addElement(gameObject) {
        this.elementList.push(gameObject);
    }

}

class gameElement {

    constructor(xPos, yPos, areaBox, xSpeed, ySpeed) {

        this.xPos = xPos;
        this.yPos = yPos;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.boundingBox = areaBox;
        this.quadLocList = [];
    }

    printLocList() {
        for(var i = 0; i< this.quadLocList.length; i++) {
            console.log("pos: " + this.quadLocList[i].position + ", dep: " + this.quadLocList[i].depth);
        }


    }

}











