function ButtonAccordion(up, down, left ,right, shield) {

    /**
     * ideally we need an array to store all the elements, call it button list
     * this will store the gameButton objects created in the index.js file
     * length of the array will be a fixed value based on the amount of buttons
     * chosen for the game. Pretty modular
     */

    this.buttonList = [];
    this.buttonList.push(up);
    this.buttonList.push(down);
    this.buttonList.push(left);
    this.buttonList.push(right);
    this.buttonList.push(shield);
    



    /**
     * what this function does is if you want to pull if a button is true, 
     * then you provide the buttonName and it will spit out an index of 
     * the value in the accordion
     * @param {*} buttonName 
     */

    this.mapperFunction = function(buttonName) {
        if(buttonName == "up") {
            return 0;
        }else if(buttonName == "down") {
            return 1;
        }else if(buttonName == "left") {
            return 2;
        }else if(buttonName == "right") {
            return 3;
        }else if(buttonName == "shield") {
            return 4;
        }else {
            return -1;
        }
    }

    /**
     * this function will be getStatus. It will take in a buttonName and it will return the
     * status of the button
     */

    this.getStatus = function(buttonName) {
        var index = this.mapperFunction(buttonName);
        if(index >= 0) {
            return this.buttonList[index].getPressStatus();
        }

        return false; 
    }
}