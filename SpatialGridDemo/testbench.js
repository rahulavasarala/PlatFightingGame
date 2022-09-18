//this is just a script so we can run lots of test cases without the need of creating a runnable class

import { SpatialTile } from './spatial_tile.js';
import { SpatialGrid } from './spatial_grid.js';
import { Entity } from './entity.js';
import { BoundingBox } from './entity.js';

import { handle_collisions } from './index.js';
import { collision_resolver } from './index.js';


// let my_tile = new SpatialTile();

// my_tile.add_entity(6);

// console.log(my_tile.entities);

//---------------------tile works 

let my_grid = new SpatialGrid(600,600,4,4);

// my_grid.visualize();

//---------------------------visualizing the empty spatial grid works

let bb1 = new BoundingBox(100,100);
let bb2 = new BoundingBox(25, 80);

//let e1 = new Entity(25,25, 6,5, bb1);

// my_grid.hash(e1);


// let e2 = new Entity(158,422, 6,5, bb1);

// my_grid.hash(e2);

// let e3 = new Entity(200,200, 6,5, bb1);

// my_grid.hash(e3);


// my_grid.visualize();

// my_grid.unhash(e3);

// my_grid.visualize();

//So hashing and unhashing base cases work- what about big bois injected in the system?

// let bb2 = new BoundingBox(250, 250);

// let e4 = new Entity(125,125,2,2, bb2);

// my_grid.hash(e4);

// my_grid.visualize();
// my_grid.visualize_v2();

// my_grid.unhash(e4);

// my_grid.visualize();
// my_grid.visualize_v2();

//---------------------So big bois work hashing and unhashing, that is pretty cool

//make a bunch of intersecting people

// let player_list = [];

let e1 =new Entity(100,100,2,2, bb1,0);
let e2 =new Entity(190,110,-2,-2, bb1,1);
// let e3 =new Entity(210,70,2,2, bb1,2);
// let e4 =new Entity(350,350,2,2, bb1,3);
// let e5 =new Entity(40, 400,2,2, bb1,4);
// let e6 =new Entity(65,25,2,2, bb1,5);
// let e7 =new Entity(270,320,2,2, bb1,6);
// let e8 =new Entity(70,350,2,2, bb1,7);

// player_list.push(e1);
// player_list.push(e2);
// player_list.push(e3);
// player_list.push(e4);
// player_list.push(e5);
// player_list.push(e6);
// player_list.push(e7);
// player_list.push(e8);

// my_grid.hash(e1);
// my_grid.hash(e2);
// my_grid.hash(e3);
// my_grid.hash(e4);
// my_grid.hash(e5);
// my_grid.hash(e6);
// my_grid.hash(e7);
// my_grid.hash(e8);

// my_grid.visualize();
// my_grid.visualize_v2();


// handle_collisions(player_list, my_grid);
// console.log(e1.intersects(e6));


//check whether the collision resolution works

collision_resolver(e1, e2);

console.log(e1, e2);
console.log(e1.intersects(e2));












