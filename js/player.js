function Player(x, y, accordionIn, stateMachine, boundingBox) {

    /**
     * the player will have the following fields
     * 
     * foot
     * xPos
     * yPos
     * xSpeed
     * ySpeed
     * isGrounded
     * shieldstun
     * 
     * controlAccordion
     * StateMachine- holds the current state
     * currAnimation 
     * 
     */

    this.xPos = x;
    this.yPos = y; 
    this.height= 50;
    this.width = 50;
    this.foot = this.yPos + this.height;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.friction = 0.01
    this.terminalVelocity = 3; 
    this.stateMachine = stateMachine;// need to somehow construct the state machine
    this.isGrounded = false;
    this.accordion = accordionIn;  //just updated each step at the beginning
    this.gravity = 0.01;
    this.shield = new Shield();
    this.boundingBox = boundingBox;
    this.quadLocList = [];
   
    /**
     * this function is where all the other elementary functions are going to be called
     * 
     */

    this.step = function() {
        //determine hueristics such as whether the player is grounded or not
        var groundHeuristic = this.determineGrounded();
        
        if(groundHeuristic != false) {
            this.isGrounded = true;
            this.setFoot(groundHeuristic.yPos);
            this.ySpeed = 0;
        }else {
            this.isGrounded = false;
        }

        //check shield
        if(this.stateMachine.currentState.stateName == "shield") {//code shield breaker too
            //deplete the shield
            if(this.shield.size > 0) {
                this.shield.size -= .1;
            }
            console.log("Shield Size: " + this.shield.size);
        }else {
            //recover the shield

            if(this.shield.size < 50) {
                this.shield.size++;
            }
        }

        //first set the speed and animation and the other things to whatever the currentFrame in the state machine points too

        var xSpeedFetched = this.timelineFetcher(this.stateMachine.currFrame, this.stateMachine.currentState.velocityTimeline);
        if(xSpeedFetched != false) {
            this.xSpeed = xSpeedFetched;
        }


        //then run the cancellable thing to try to cancel the current state of the state machine into another state

        if(this.cancelFunction() == true) {
            return;
        }



        //then do all of the movement and gravity after- terminal velocity and shit 
        if(this.stateMachine.currentState.stateName == "js" && this.stateMachine.currFrame == 6) {
            this.ySpeed = -1;
        }

        if(this.stateMachine.currentState.stateName == "fall") {//works
            this.addGravityEffect();
        }

        if(this.stateMachine.currentState.canMove == true) {//works
            this.addAerialDriftEffect();
        }

        this.updateX();
        this.updateY();

        console.log("the current state of Player is:" + this.stateMachine.currentState.stateName);
        //console.log("current frame is: "+ this.stateMachine.currFrame);

        //console.log("current (xSpeed, ySpeed) is: ("+this.xSpeed + ","+ this.ySpeed+")");
        //console.log("current (xPos, yPos) is: ("+this.xPos + ","+ this.yPos+")");


        this.stateMachine.tick();
    }

    /**
     * this function updates the x value of the player
     */

    this.updateX = function() {
        this.xPos += this.xSpeed;
    }

    /**
     * this function updates the y value of the player
     */

     this.updateY = function() {
        this.yPos += this.ySpeed;
    }

    /**
     * this function updates the animation of the player
     */

     this.updateAnimation = function() {

    }

    /**
     * this function sets the speed of the character as to what the state specifies.
     */

    this.stateSpeedSetter = function() {
        
    }

    /**
     * this method will check the cancellable array for cancel windows and see if the ControlAccordion inputs match this
     * if so, it will tell the state machine to update its current state to the new state.
     * this will not only use the accordion but will also use isGrounded for cancelling aerials 
     * currently it will have a linear runtime which is pretty bad
     */

    this.stateCanceller = function() {

    }

    /**
     * this will calculate whether the character is grounded or not. Will use the foot of the character
     * and speed in order to do so
     */
    
    this.determineGrounded = function() {
        if(this.ySpeed >= 0) {
            //console.log(platformArray);
            return this.intersectsPlatform(platformArray);
        }

        return false;

    }

    /**
     * makes the first state 
     */

    this.setState = function(inputState) {
        //first generate the velocity timeline

        this.currentState = inputState;


    }

    /**
     * this method advances the state frame each step and changes the state of the statemachine 
     * if the frame is the last frame.
     */

    this.stateAdvancer = function() {

    }
    
    /**
     * this function will draw the player, using the currAnimation and position
     */


    this.draw = function() {
        if(this.stateMachine.currentState.stateName == "ss") {
            ctx.fillStyle = "yellow";
        }else {
            ctx.fillStyle = "blue";
        }
       
        ctx.fillRect(this.xPos,this.yPos, this.width, this.height);

        if(this.stateMachine.currentState.stateName == "shield") {
            ctx.fillStyle = "red";
            var xMargin = (this.width - this.shield.size)/2;
            var yMargin = (this.height - this.shield.size)/2;

            ctx.fillRect(this.xPos + xMargin,this.yPos + yMargin, this.shield.size, this.shield.size);
        }
    }

    this.timelineFetcher = function(frame, dataTimeline) {

        for(var i = 0; i< dataTimeline.length; i++) {
            if(frame <= dataTimeline[i].endFrame && frame >= dataTimeline[i].startFrame) {
                return dataTimeline[i].getData();
            }
        }

        return false;

    }

    /**
     * there is going to be a platform list and ground list that can be built off a file
     * 
     * this function should return the whole platform(more like a reference to it)
     */

    this.intersectsPlatform = function(platformList) {
        var xLow = this.xPos;
        var xHigh = this.xPos + this.width;
        var yHigh = this.yPos; 
        var yLow = yHigh + this.height;
        
        for(var i = 0; i< platformList.length; i++) {
            var currPlatform = platformList[i];

            var pxLow = currPlatform.xPos;
            var pxHigh = pxLow + currPlatform.width;
            var pyHigh = currPlatform.yPos;
            var pyLow = pyHigh + currPlatform.height;

            if(xLow > pxHigh || xHigh < pxLow || yHigh > pyLow || yLow < pyHigh) {
                continue;
            } else {
                return currPlatform;
            }
        }

        return false;
        
    }

    this.addGravityEffect = function() {
        if(this.ySpeed >= this.terminalVelocity) {
            this.ySpeed = this.terminalVelocity;
        }else {
            this.ySpeed += this.gravity;
        }
    }

    /**
     * basically this will check whether the current state is compatible with arial drift
     * if so, if the accordion sends off a signal then it will increment the xSpeed of the character
     * we literally do not need to test this with the speedChangeState
     */

    this.addAerialDriftEffect = function() {
        var left = this.accordion.getStatus("left");
        var right = this.accordion.getStatus("right");

        if((!left && !right) ||(left && right)) {
            if(this.xSpeed < 0.00001 || this.xSpeed > -0.00001) {
                this.xSpeed = 0;
            }else {
                this.xSpeed *= this.friction;
            }
        } else if(right){
            this.xSpeed = 1;
        }else if(left) {
            this.xSpeed = -1;
        }

    }

    this.setFoot = function(height) {
        this.yPos = height - this.height;
    }

    /**
     * This looks good
     * @param {} cancelEvent 
     * @returns 
     */

    this.cancelHelper = function(cancelEvent) {
        var event = cancelEvent.event;
        var sign = cancelEvent.sign;

        if(this.accordion.mapperFunction(event) >= 0) {
            return this.accordion.getStatus(event) == sign;
        }else if(event == "isGrounded") {
            return this.isGrounded == sign;
        }else if(event == "ss") {
            return this.shield.size <= 0;
        }else  {
            return false; 
        }

    }

    /**
     * This looks good
     * @returns 
     */

    this.cancelFunction = function() {
        var currCancelTimeline = this.stateMachine.currentState.cancelTimeline;
        var currFrame = this.stateMachine.currFrame;

        for(var i = 0; i < currCancelTimeline.length; i++) {
            if(currFrame <= currCancelTimeline[i].endFrame || currFrame >= currCancelTimeline[i].startFrame) {
                if(this.cancelHelper(currCancelTimeline[i].data) == true) {
                    this.stateMachine.update(currCancelTimeline[i].data.statePointer);
                    return true;
                }
            }
        }

        return false;

    }



}

/**---created the shield state
 * next thing to do is create a sandbag
 * 
 * then create the attack state- figure out objects and figure out the inheritance
 * 
 *  
 * 
 * ecb box
 * 
 * the ideal way to make characters is to extend them from player and then add specific code for them in the step function
 * and create their own state machines obviously
 * 
 * create a sentient being called the game, that monitors ecb collisions and the hitbox collisions. 
 * 
 * 
 * so what is an ecb box- 
 * 
 * it is an object with 4 points that make a box around the character and are localized through the characters x y position
 * 
 * we need to make a function of the form player(platform) which checks to see whether the ecb box of the player will touch the platform and whether it is worthy 
 * of invoking a position/ speed change/ isGrounded call
 * 
 * isGrounded should be a boolean, and touching Plat is a platform
 * 
 * for platform stops- if the speed is negative and down is not being held on shield drop plat ------- or normal platform ------all with the condition that there is a point intersection
 * then teleport to the top of the ecb
 * 
 * for platform slides-- check whether the platform is solid, and find the intersection coordinate with the top bar, and translate that distance -- covers all cases
 * 
 * then code player ecb collisions- if two players ecb boxes are touching, then whoever is hit slides back and the characters 
 * 
 * point under line calculator
 * 
 * 
 * limitations of normal rectangular ecb- cant slide down plats
 */


