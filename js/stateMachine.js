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

        //set the velocity timelines of the states first
        var rwalkVelTimeline = [new timelineContainer(4, 0, 34)];
        var lwalkVelTimeline = [new timelineContainer(-4, 0, 34)];
        var fallVelTimeline = [new timelineContainer(1,-1,-1)];
        var jsVelTimeline = [new timelineContainer(0, 6, 6)];
        var idleVelTimeline = [new timelineContainer(-0.00001, 0, 14)]; // the problem is that the speed of the idlevelTimeline is not being fetched
        var shieldVelTimeline = [new timelineContainer(-0.00001, 0, 100)];
        var ssVelTimeline = [new timelineContainer(-0.00001, 0, 100)];

        this.stateArray.push(new State("idle", 14, idleVelTimeline, null, false, null));
        this.stateArray.push(new State("fall", 14, fallVelTimeline, null, true, null));
        this.stateArray.push(new State("js", 6, jsVelTimeline, null, false, null));
        this.stateArray.push(new State("rwalk", 34, rwalkVelTimeline, null, false, null));
        this.stateArray.push(new State("lwalk", 34, lwalkVelTimeline, null, false, null));
        this.stateArray.push(new State("shield", 50, shieldVelTimeline, null, false, null));
        this.stateArray.push(new State("ss", 100, ssVelTimeline, null, false, null));

        this.stateArray[0].setTailState(this.stateArray[0]);
        this.stateArray[1].setTailState(this.stateArray[1]);
        this.stateArray[2].setTailState(this.stateArray[1]);
        this.stateArray[3].setTailState(this.stateArray[0]);
        this.stateArray[4].setTailState(this.stateArray[0]);
        this.stateArray[5].setTailState(this.stateArray[5]);
        this.stateArray[6].setTailState(this.stateArray[0]);

        var rwalkCancelTimeline = [new timelineContainer(new CancelEvent("up", true, this.stateArray[2]), 0, 34), new timelineContainer(new CancelEvent("down", true, this.stateArray[0]), 0, 34)];
        var lwalkCancelTimeline = [new timelineContainer(new CancelEvent("up", true, this.stateArray[2]), 0, 34), new timelineContainer(new CancelEvent("down", true, this.stateArray[0]), 0, 34)];
        var fallCancelTimeline = [new timelineContainer(new CancelEvent("isGrounded", true, this.stateArray[0]), 0, 14)];
        var jsCancelTimeline = [];
        var idleCancelTimeline = [new timelineContainer(new CancelEvent("up", true, this.stateArray[2]), 0, 14), new timelineContainer(new CancelEvent("right", true, this.stateArray[3]), 0, 14), new timelineContainer(new CancelEvent("left", true, this.stateArray[4]), 0, 14), new timelineContainer(new CancelEvent("shield", true, this.stateArray[5]), 0, 14)];
        var shieldCancelTimeline = [new timelineContainer(new CancelEvent("up", true, this.stateArray[2]), 0, 50), new timelineContainer(new CancelEvent("shield", false, this.stateArray[0]), 0, 50), new timelineContainer(new CancelEvent("ss", true, this.stateArray[6]), 0, 50)];
        var ssCancelTimeline = [];

        this.stateArray[0].setCancelTimeline(idleCancelTimeline);
        this.stateArray[1].setCancelTimeline(fallCancelTimeline);
        this.stateArray[2].setCancelTimeline(jsCancelTimeline);
        this.stateArray[3].setCancelTimeline(rwalkCancelTimeline);
        this.stateArray[4].setCancelTimeline(lwalkCancelTimeline);
        this.stateArray[5].setCancelTimeline(shieldCancelTimeline);
        this.stateArray[6].setCancelTimeline(ssCancelTimeline);

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