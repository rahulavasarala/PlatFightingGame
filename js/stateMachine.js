function StateMachine() {

    /**
     * so basically you can just save all the states in a giant array list and have the states point to eachother, to ave access speed
     * the only downside is that you will have to manually code each state and it will be tedious
     * but not if you have good documentation
     */

    this.stateArray = [];

    this.currentState;

    this.currFrame = 0;

    /**
     * first build a rigid state machine to one contain the code and test, and then you can do all of the
     * shenanigans, build a rigid object first and then make it instanciable :0.....
     * 
     * 
     * tail state of jumpSquat is 
     */

    this.initializeStateArray = function() {
        var walkingState;
        var fallingState;
        var jsState;
        var idleState;

        //set the velocity timelines of the states first
        var walkVelTimeline = [new timelineContainer(4, 0, 34)];
        var fallVelTimeline = [new timelineContainer(1,-1,-1)];
        var jsVelTimeline = [new timelineContainer(0, 6, 6)];
        var idleVelTimeline = [new timelineContainer(0.000001, 0, 14)]; // the problem is that the speed of the idlevelTimeline is not being fetched

        this.stateArray.push(new State("walk", 34, walkVelTimeline, null, false, null));
        this.stateArray.push(new State("fall", 14, fallVelTimeline, null, true, null));
        this.stateArray.push(new State("js", 6, jsVelTimeline, null, false, null));
        this.stateArray.push(new State("idle", 14, idleVelTimeline, null, false, null));

        this.stateArray[0].setTailState(this.stateArray[3]);
        this.stateArray[1].setTailState(this.stateArray[1]);
        this.stateArray[2].setTailState(this.stateArray[1]);
        this.stateArray[3].setTailState(this.stateArray[3]);

        var walkCancelTimeline = [new timelineContainer(new CancelEvent("up", true, this.stateArray[2]), 0, 34), new timelineContainer(new CancelEvent("down", true, this.stateArray[3]), 0, 34)];
        var fallCancelTimeline = [new timelineContainer(new CancelEvent("isGrounded", true, this.stateArray[3]), 0, 14)];
        var jsCancelTimeline = [];
        var idleCancelTimeline = [new timelineContainer(new CancelEvent("up", true, this.stateArray[2]), 0, 14), new timelineContainer(new CancelEvent("right", true, this.stateArray[0]), 0, 14)];

        this.stateArray[0].setCancelTimeline(walkCancelTimeline);
        this.stateArray[1].setCancelTimeline(fallCancelTimeline);
        this.stateArray[2].setCancelTimeline(jsCancelTimeline);
        this.stateArray[3].setCancelTimeline(idleCancelTimeline);

        this.currentState = this.stateArray[1];
    }

    this.update = function(state) {
        this.currFrame = 0;
        this.currentState = state; 
    }

    this.tick = function() {
        if(this.currFrame > this.currentState.endFrame) {
            this.update(this.currentState.tailState);
        }else {
            this.currFrame++;
        }
        
    }

}