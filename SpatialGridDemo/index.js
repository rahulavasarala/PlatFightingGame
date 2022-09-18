//On startup, I want to create a function that has a player list,
// import { SpatialTile } from './spatial_tile.js';
// import { SpatialGrid } from './spatial_grid.js';
// import { Entity } from './entity.js';
// import { BoundingBox } from './entity.js';


var spatial_grid;
var player_list;
var ctx;
var canvas;
var game_loop;

window.onload = function() {

    //you can create all the elements you want here because this function will never despawn

    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");

    player_list = [];

    let bb1 = new BoundingBox(20,20);

    let e1 =new Entity(20,20,2,2, bb1,0);
    let e2 =new Entity(50,50,-2,2, bb1,1);
    let e3 =new Entity(210,70,2,2, bb1,2);
    let e4 =new Entity(350,430,-2,2, bb1,3);
    let e5 =new Entity(40, 400,2,2, bb1,4);
    let e6 =new Entity(65,25,-2,2, bb1,5);
    let e7 =new Entity(270,320,2,2, bb1,6);
    let e8 =new Entity(70,450,-2,2, bb1,7);

    player_list.push(e1);
    player_list.push(e2);
    player_list.push(e3);
    player_list.push(e4);
    player_list.push(e5);
    player_list.push(e6);
    player_list.push(e7);
    player_list.push(e8);

    spatial_grid = new SpatialGrid(500,500, 5,5);

    game_loop = setInterval(step, 1000/144);//will make the game run at 15 fps
}

function step() {

    update_player_pos();
    rehash_people();
    handle_collisions();

    draw();
}

//The functions will happen in a loop in this exact following order

function update_player_pos() {

    for(var i = 0; i< player_list.length; i++) {
        player_list[i].move();
    }

}

function rehash_people() {
    for(var i = 0; i < player_list.length; i++) {
        spatial_grid.unhash(player_list[i]);
    }

    for(var i = 0; i < player_list.length; i++) {
        spatial_grid.hash(player_list[i]);
    }

}

function handle_collisions() {

    //basically, check speed conditions and wall bumping conditions, else make wall entities
    //create logic for the endzones

    //this part requires a little bit of thinking, and is gonna be pretty tough

    //you can handle triple and quadruple and infi collisions with this strategy, 
    //iterate through the players list, for each player, check all the people that he can intersect with
    //have a hashmap to remeber players whos collisions were already handled,
    //remember guys who have completed their outcome of changing direction or not(locked in) to a hashmap. 

    console.log("Handling Collisions in 3,2,1...")

    let collided_map = new Map();
    let untouched_map = new Map();

    for(var i = 0; i < player_list.length; i++) {

        let skipper = false
        let curr_ent = player_list[i];

        console.log("Current Entity: Player ", curr_ent.id, "----------------------");

        //Check walls collision first

        if(collided_map.has(curr_ent.id)) {
            continue;
        }

        //console.log("Got here 0!");

        if(curr_ent.correct_path(0,0, spatial_grid.width, spatial_grid.height)) {
            collided_map.set(curr_ent.id, true);
            continue;
        }

        //console.log("Got here 1!");

        let not_intersected_map = new Map();

        for(const hash_spot of player_list[i].last_locations) {
            for(const entity of spatial_grid.grid[hash_spot].entities) {
                console.log("Entity Id is: ", entity.id);

                if(curr_ent.id == entity.id || untouched_map.has(entity.id) || not_intersected_map.has(entity.id)) {
                    continue;
                }

                if(curr_ent.intersects(entity)) {
                    collided_map.set(entity.id, true);
                    collided_map.set(curr_ent.id, true);
                    //console.log("Intersection occurred between: ", curr_ent.id, " and ", entity.id);
                    collision_resolver(curr_ent, entity);
                    skipper = true;
                }else {
                    //console.log("No Intersection occurred between: ", curr_ent.id, " and ", entity.id);
                    not_intersected_map.set(entity.id, true);
                }

                if(skipper) {
                    break;
                }
            }
            if(skipper) {
                break;
            }

        }

        if(skipper) {
            continue;
        }

        console.log("Added to the untouched map!")
        untouched_map.set(curr_ent.id, true);
        
        
    }

    console.log("Untouched map is: ", untouched_map);
    console.log("Collision map is: ", collided_map)


}

function draw() {

    //we need to draw all the squares on the map, and we
    //first let us draw the squares without drawing the amount of people in each square

    ctx.fillStyle = "white";
    ctx.fillRect(0,0,spatial_grid.width,spatial_grid.height);

    draw_players();
    draw_tiles();

    
}

function draw_players(){

    for(var i = 0; i<player_list.length; i++) {

        ctx.fillStyle = "green";
        ctx.fillRect(player_list[i].x, player_list[i].y, player_list[i].collisionbox.width, player_list[i].collisionbox.height);
    }
}

function draw_tiles() {//working

    for(var i = 0; i < spatial_grid.rows; i++) {
        for(var j = 0; j < spatial_grid.cols; j++) {

            let width = spatial_grid.width/spatial_grid.cols;
            let x0 = j* (width);

            let height = spatial_grid.height/spatial_grid.rows;
            let y0 = i * height;

            let coordx = x0 + width/2;
            let coordy = y0 + height/2;

            ctx.font = '10px serif';
            ctx.fillStyle = "black";
            
            ctx.fillText(spatial_grid.grid[j + i* spatial_grid.cols].entities.size, coordy, coordx);
            ctx.lineWidth = 2;
            ctx.strokeStyle="#FF0000";
            ctx.strokeRect(x0, y0, width, height);//for white background

        }
    }


}

//this will probably fail, but it was worth a shot

function collision_resolver(entity1, entity2) {

    let col_rect_width = Math.min(Math.abs(entity1.x - (entity2.x + entity2.collisionbox.width)), Math.abs((entity1.x + entity1.collisionbox.width) - entity2.x), entity1.collisionbox.width, entity2.collisionbox.width);

    let col_rect_height = Math.min(Math.abs(entity1.y -entity2.y + entity2.collisionbox.height), Math.abs(entity1.y + entity1.collisionbox.height - entity2.y), entity2.collisionbox.height, entity1.collisionbox.height);

    if(col_rect_width > col_rect_height) {
        //reverse y direction
        entity1.ysp *= -1;
        entity2.ysp *= -1;

        entity1.y = entity1.y + (col_rect_width/2) * (entity1.ysp/Math.abs(entity1.ysp)) + 1* (entity1.ysp/Math.abs(entity1.ysp));
        entity2.y = entity2.y + (col_rect_width/2) * (entity2.ysp/Math.abs(entity2.ysp)) + 1* (entity2.ysp/Math.abs(entity2.ysp));
    }else {
        //reverse the x direction
        entity1.xsp *= -1;
        entity2.xsp *= -1;

        entity1.x = entity1.x + (col_rect_width/2) * (entity1.xsp/Math.abs(entity1.xsp)) + 1 * (entity1.xsp/Math.abs(entity1.xsp));
        entity2.x = entity2.x + (col_rect_width/2) * (entity2.xsp/Math.abs(entity2.xsp)) + 1 * (entity2.xsp/Math.abs(entity2.xsp));
    }

    //move in the direction of the speed

}