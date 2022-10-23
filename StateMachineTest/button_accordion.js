class ButtonAccordion {


    constructor(up, down, left, right, mod1, mod2) {//making the controls gameboy style, these buttons will just be new Booleans

        this.button_dict = {};

        this.button_dict["up"] = up;
        this.button_dict["down"] = down;
        this.button_dict["left"] = left;
        this.button_dict["right"] = right;
        this.button_dict["mod1"] = mod1;
        this.button_dict["mod2"] = mod2;


    }

}

class GameButton{

    constructor(val) {
        this.bool = val;
    }

    press() {

        this.bool = true;
    }

    release() {
        this.bool = false;
    }

    valueOf() {
        return this.bool;
    }


}