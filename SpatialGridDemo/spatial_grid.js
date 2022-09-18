// import { SpatialTile } from './spatial_tile.js';

class SpatialGrid {

    constructor(width, height, rows, cols) {

        this.width = width;
        this.height = height;
        this.rows= rows;
        this.cols = cols;

        this.grid = [];

        for(var i = 0; i <rows * cols; i++) {
            this.grid.push(new SpatialTile())
        }
    }

    hash(entity) {

        var hash_list = this.hash_helper(entity);

        for(const element of hash_list) {
            console.log(element);
            this.grid[element].add_entity(entity);
            entity.last_locations.push(element);
        }
    }

    hash_helper(entity) {

        let p1 = [entity.x, entity.y];
        let p4 = [entity.x + entity.collisionbox.width, entity.y + entity.collisionbox.height]

        let coord1 = this.point_to_coord(p1);
        let coord2 = this.point_to_coord(p4);


        let hash_list = []

        for(var i = coord1[0]; i<= coord2[0]; i++) {
            for(var j = coord1[1]; j<= coord2[1]; j++) {
                let index = j * this.cols + i;
                if(index >= 0 && index < this.rows * this.cols) {
                    hash_list.push(index);
                }
                
            }
        }

        return hash_list;
    }

    point_to_coord(point) {

        let x = point[0];
        let y = point[1];

        let unit_width = this.width/this.cols;

        let unit_height = this.height/this.rows; 

        var x_hash = (x/unit_width) | 0;
        var y_hash = (y/unit_height) | 0;

        return [y_hash, x_hash];
        
    }

    unhash(entity) {

        for(var i = 0; i < entity.last_locations.length; i++) {
            this.grid[entity.last_locations[i]].remove_entity(entity);
        }
        entity.last_locations = [];

    }

    visualize() {

        //make a function that visualizes the board.
        
        console.log("-------Visualize V1-------");

        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                console.log("Row: ", i , "Col: ", j, "Vals: ", this.grid[j + i * this.rows].entities);
            }
        }

        console.log("-------Visualize V1-------");
    }

    visualize_v2() {

        console.log("-------Visualize V2-------");

        for(var i = 0; i < this.rows; i++) {
            let k = "";
            for(var j = 0; j < this.cols; j++) {
                if(this.grid[i*this.rows + j].entities.size != 0) {
                    k += "X";
                }else {
                    k += "O";
                }
            }
            console.log(k);
        }

        console.log("-------Visualize V2-------");
    }

}