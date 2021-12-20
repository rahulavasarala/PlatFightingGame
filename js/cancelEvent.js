function CancelEvent(event, sign, state) {


    this.event = event;
    this.sign = sign;
    this.statePointer = state;


    this.setState = function(state) {
        this.statePointer = state; 
    }
}