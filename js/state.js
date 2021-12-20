function State(stateName, endFrame, velocityTimeline, cancelTimeline, canMove, tailState) {
    /**
     * the fields that we want for the state are
     * 
     * ending frame
     * 
     * list<velocity timeline> - i will test the functionality of the state with this barebones code
     * list<animation timeline> this will be implemented in the end game
     * list<hitbox timeline>
     * list<hurtbox timeline>
     * list<cancelable timeline>
     * 
     * isAerialDrift
     * defaultEndStatePointer
     * 
     * eventually we will need to generate a state machine off of raw data which will be fun. 
     * each character will have a file that encodes their state machine, so before every match, you build
     * the specific character's state machine and then spawn them on the field. 
     * 
     */

    this.stateName = stateName;

    this.endFrame = endFrame;

    this.velocityTimeline = velocityTimeline; 

    this.cancelTimeline = cancelTimeline;

    this.canMove = canMove;

    this.tailState = tailState;

    this.getEndFrame = function() {
        return this.endFrame;
    }

    this.setTailState = function(tailState) {
        this.tailState = tailState;
    }

    this.setCancelTimeline = function(cancelTimeline) {
        this.cancelTimeline = cancelTimeline; 
    }
}