//Import classes that are going to be used in this file for node.js
let quadTree = require("./QuadTree");
let gameElement = quadTree.gameElement;
let QuadTree = quadTree.QuadTree;
let QuadNode = quadTree.QuadNode;

let boundingBox = require("./boundingBox");
let BoundingBox = boundingBox.BoundingBox;


//basically what i need to do is create a bunch of game elements, insert them into the quadTree, and then print out the
//contents of the quadtree so i can make sure it is working
//need to test out whether you can add, whether the subdivide functionality works, whether the autodelete space functionality works,
//whether remove works since it is by reference. 
//also a preliminary test that will save a bunch of time is manual deletion
//if you have a node structure and you delete the reference to the node, the whole node structure disappears

qT = new QuadTree(new BoundingBox(0, 500, 0, 500));

g1 = new gameElement(40, 60, new BoundingBox(0,50,0,50));
g2 = new gameElement(40, 80, new BoundingBox(0,50,0,50));
g3 = new gameElement(30, 90, new BoundingBox(0,50,0,50));

qT.quadAdd(g1);
qT.quadAdd(g2);
qT.quadAdd(g3);
//qT.print();

//uptil this stage worked

g4 = new gameElement(300, 60, new BoundingBox(0,50,0,50));
g5 = new gameElement(200, 300, new BoundingBox(0,50,0,50));
g6 = new gameElement(430, 430, new BoundingBox(0,50,0,50));

qT.quadAdd(g4);
qT.quadAdd(g5);
qT.quadAdd(g6);

qT.print();



for(var i = 0; i<g1.quadLocList.length; i++) {
    console.log("G1 pointers are " + g1.quadLocList[i].position);
}

//still need to check whether the comparisons are right
//still need to check the case where an element is in the dead center and splits into two subspaces. 

g7 = new gameElement(10, 250, new BoundingBox(0, 1, 0, 100));
qT.quadAdd(g7);

qT.print();
g7.printLocList();

//splitting is working, Yay

//------------------------------------------------------------------

qT.quadRemove(g7);

qT.print();
g7.printLocList();




//the test results mean that deletion has to occur through the parent
//testing works, that is a huge milestone that we got past
//you can only change the contents of an object, not the object itself