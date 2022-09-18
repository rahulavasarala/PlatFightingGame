function GameButton() {

    this.isPressed = false;

    this.release = function() {
        this.isPressed = false;
    }

    this.press = function() {
        this.isPressed = true;
    }

    this.getPressStatus = function() {
        return this.isPressed;
    }


}