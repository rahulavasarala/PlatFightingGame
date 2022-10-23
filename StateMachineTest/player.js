// import { createRequire } from "module";
// const require = createRequire(import.meta.url);//this is for node js es6 json files
//import data from "./firstsm.json";

class Player{

    //will make it in the future that the base properties will be extracted from a file

    constructor(state_machine_file,button_accordion, bbox) {
        this.property_dict = {};
        this.init_properties(bbox);
        this.event_dict = {};
        this.button_accordion = button_accordion;
        this.init_event_dict();
        this.curr_frame = 0;
        this.curr_state = null;
        this.state_machine = {};
        this.last_cancel_input = null;
        this.init_state_machine(state_machine_file);
    }

    init_properties(bbox) {//list how many ever properties you need

        this.property_dict["x"] = 300;
        this.property_dict["y"] = 300;
        this.property_dict["bbox"] = bbox;
        this.property_dict["isground"] = false;
        this.property_dict["isplat"] = false;
        this.property_dict["hitstun"] = 0;
        this.property_dict["dashspeed"] = 0;
        this.property_dict["jump_vel"] = 0;
        this.property_dict["face_side"] = 1;//can be 1 or -1
        this.property_dict["walkspeed"] = 0;
        this.property_dict["jumpcount"] = 0;
        this.property_dict["xspeed"] = 0;
        this.property_dict["yspeed"] = 0;
        this.property_dict["gravity"] = 1;
        this.property_dict["fall_speed"] = -2;
        this.property_dict["shield"] = 30;
        this.property_dict["aerial_drift"] = 15;

    }

    init_state_machine(state_machine_file) {

        this.curr_state = "freefall";

        this.state_machine = smdata;
    }

    init_event_dict() {

        this.event_dict["up"] = this.button_accordion.button_dict["up"];
        this.event_dict["down"] = this.button_accordion.button_dict["down"];
        this.event_dict["mod1"] = this.button_accordion.button_dict["mod1"];
        this.event_dict["mod2"] = this.button_accordion.button_dict["mod2"];
        this.event_dict["isfloor"] = false;
        this.event_dict["smdir"] = false;
        this.event_dict["opdir"] = false;
        this.event_dict["empty_shield"] = false;
    }

    tick() {

        console.log("Player1.curr_frame: ", this.curr_frame);
        console.log("Player1.curr_state: ", this.curr_state);

        if(this.state_machine[this.curr_state]["flip"] == 1 && this.curr_frame == 0 && this.last_cancel_input.indexOf("opdir") != -1) {
            this.property_dict["face_side"] *= -1;
        }

        this.set_events();

        this.set_properties();

        //extension section of set properties

        if(this.curr_state == "shield") {
            console.log("Shield Stat: ", this.property_dict["shield"]);
            this.property_dict["shield_stat"]--;

            if(this.property_dict["shield"] == 0) {
                this.event_dict["empty_shield"] = true;
            }
            
        }

        this.update_pos();

        this.handle_ground_case();

        let was_cancelled = this.state_canceller();

        if(was_cancelled == true) {
            return;
        }

        //update the x pos and y pos based on the speed

       

        if(this.curr_frame == this.state_machine[this.curr_state]["end_frame"]) {
            this.curr_frame = 0;
            this.curr_state = this.state_machine[this.curr_state]["default_link"];
            return;
        }

        this.curr_frame++;

    }

    update_pos() {

        this.property_dict["x"] += this.property_dict["face_side"]*this.property_dict["xspeed"];
        this.property_dict["y"] -= this.property_dict["yspeed"];

        console.log("isfloor: ", this.event_dict["isfloor"])

        if(this.event_dict["isfloor"] != true) {
            this.property_dict["yspeed"] -= this.property_dict["gravity"];
            
            if(this.property_dict["yspeed"] < this.property_dict["fall_speed"]) {
                this.property_dict["yspeed"] = this.property_dict["fall_speed"];
            }
        }

        //arial drift

        if(this.event_dict["isfloor"] == false) {
            
        }
    }

    handle_ground_case() {

        //this is just a temporary method to handle the ground case of when the character touches the ground in the demo. 

        if(this.property_dict["y"] + this.property_dict["bbox"].height >= 500) {
            this.property_dict["y"] =  500 - this.property_dict["bbox"].height;
            this.property_dict["yspeed"] = 0;
            this.property_dict["isground"] = true;
        }
    }

    state_canceller() {//tested this out, works

        for(const element of this.state_machine[this.curr_state]["cancel_list"]) {

            let input_arr = element[0];
            let timeline = element[1];
            let link_state = element[2];

            // console.log("input_arr = :", input_arr);

            let bad_element = false;

            for(const input of input_arr) {
                if(this.event_dict[input].valueOf() != true) {
                    bad_element = true;
                    break;
                }
            }

            if(bad_element) {
                continue;
            }

            for(const frame_interval of timeline) {

                if(this.curr_frame >= frame_interval[0] && this.curr_frame <= frame_interval[1]) {
                    this.curr_frame = 0;
                    this.curr_state = link_state;
                    this.last_cancel_input = input_arr;
                    console.log("A cancel has occurred!")
                    return true;
                }
            }

        }

        return false;
    }

    draw(ctx) {//for now, just draw a 50,50 square and ignore the bbox

        ctx.fillStyle = "green";

        ctx.fillRect(this.property_dict["x"],this.property_dict["y"], this.property_dict["bbox"].width, this.property_dict["bbox"].height);

        ctx.fillStyle = "yellow";

        if(this.property_dict["face_side"] == 1) {
            ctx.fillRect(this.property_dict["x"] + this.property_dict["bbox"].width/2 ,this.property_dict["y"], this.property_dict["bbox"].width/2, this.property_dict["bbox"].height);
        }else  {
            ctx.fillRect(this.property_dict["x"]  ,this.property_dict["y"], this.property_dict["bbox"].width/2, this.property_dict["bbox"].height);
        }

        ctx.fillStyle  = "black";
        ctx.font = '12px serif';
        ctx.fillText(this.curr_state, this.property_dict["x"] + this.property_dict["bbox"].width/2,this.property_dict["y"] + this.property_dict["bbox"].height/2);

    }

    set_events() { //working

        if(this.property_dict["isground"] || this.property_dict["isplat"]) {
            this.event_dict["isfloor"] = true;
        }else {
            this.event_dict["isfloor"] = false;
        }

        let left = this.button_accordion.button_dict["left"].valueOf();
        let right = this.button_accordion.button_dict["right"].valueOf();

        let dir = 0;

        if((left && right) || (!left && !right)) {
            this.event_dict['smdir'] = false;
            this.event_dict['opdir'] = false;
        }else {

            if(left) {
                dir = -1;
            }else {//right is true
                dir = 1;
            }

            if(dir == this.property_dict["face_side"]) {
                this.event_dict['smdir'] = true;
                this.event_dict['opdir'] = false;
            }else {
                this.event_dict['smdir'] = false;
                this.event_dict['opdir'] = true;
            }
        }
    }

    set_properties() {//working
        let property_list = this.state_machine[this.curr_state]["property_list"];
        let property_dict = this.state_machine[this.curr_state]["properties"];

        for(const property of property_list) {

            let data_arr = property_dict[property];

            for(const interval of data_arr){
                if(this.curr_frame >= interval[1] && this.curr_frame <= interval[2]) {
                    console.log("property", property, "was set to", interval[0]);
                    this.property_dict[property] = interval[0];
                    break;
                }
            }

        }
    }

}

class BoundingBox {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

}