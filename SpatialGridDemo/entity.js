class Entity {

    constructor(x_init, y_init, xs_init, ys_init, boundingbox, id) {

        this.x = x_init;
        this.y = y_init;
        this.xsp = xs_init;
        this.ysp = ys_init;
        this.id = id;

        this.collisionbox = boundingbox;
        this.last_locations = []
    }

    intersects(entity) {

        //make some code that returns true or false whether two entities intersect eachother or not. 

        if(this.x > entity.x + entity.collisionbox.width) {
            return false;
        }else if(entity.x > this.x + this.collisionbox.width) {
            return false;
        }else if(this.y > entity.y + entity.collisionbox.height) {
            return false;
        }else if(entity.y > this.y + this.collisionbox.height) {
            return false;
        }

        return true;
    } 

    move() {

        this.x = this.x + this.xsp;
        this.y = this.y + this.ysp;
    }


    update_speed(x,y) {

        this.xsp = x;
        this.ysp = y;
    }

    correct_path(x1,y1,x2, y2) {

        //this function returns whether entity is out of bounds in the x direction or y direction, and si
        //For correct path, I need to teleport the people back in their direction

        let x_both_inside = ((this.x >= x1 && this.x <= x2) && (this.x + this.collisionbox.width >= x1 && this.x + this.collisionbox.width <= x2));
        let y_both_inside = ((this.y >= y1 && this.y <= y2) && (this.y + this.collisionbox.height >= y1 && this.y + this.collisionbox.height <= y2));


        if(x_both_inside == false) {
            this.xsp = this.xsp * -1;

            //correct x coord

            if(this.xsp < 0) {
                this.x = x2 - this.collisionbox.width;
            }else {
                this.x = x1;
            }
        }

        if(y_both_inside == false) {
            this.ysp = this.ysp * -1;

            if(this.ysp < 0) {
                this.y = y2 - this.collisionbox.height;
            }else {
                this.y = y1;
            }
        }

        if(x_both_inside == false || y_both_inside == false) {
            return true;
        }

        return false;
    }


}

class BoundingBox {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

}

