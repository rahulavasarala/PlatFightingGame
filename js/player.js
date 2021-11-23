function Player(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.friction = 0.99; 
    this.gravity = 0.1;
    this.terminalVelocity = 3; 
    this.isGrounded = false; 
    this.jumpFreeze = 0;
    this.jumpFrameCount = 0;
    this.jumpAction = false;
    this.doubleJumpCount = 1;

    //this is a comment

    this.step = function() {
        if(this.jumpFreeze > 0) {
            if(upKey) {
                this.jumpFrameCount++;
            }
            this.jumpFreeze--;
            this.jumpAction = true;
            return;
        }

        if(leftKey && rightKey || !leftKey && !rightKey) {
            this.xSpeed *= this.friction; 
        }else if(rightKey) {
            this.xSpeed = 3;
        }else if(leftKey) {
            this.xSpeed = -3; 
        }

        this.x += this.xSpeed; 

        var touchedPlatHeight = this.totalTouchingPlatCheck(platformArray);

        if(touchedPlatHeight == -1 && this.isGrounded) {
            this.isGrounded = false;
        }
        if(this.jumpAction) {
            this.isGrounded = false;
            if(this.jumpFrameCount < 5) {
                this.ySpeed = 3;
            }else {
                this.ySpeed = 6;
            }
            this.jumpAction = false;
        }else if(upKey && this.isGrounded) {
            this.jumpFrameCount = 0;
            this.jumpFreeze = 3;
        }

        if(this.isGrounded == false && this.doubleJumpCount == 1 && upKey) {
            this.ySpeed = 5;
            this.doubleJumpCount = 0;
        }

        if(this.isGrounded == false && this.ySpeed <= 0 && touchedPlatHeight >= 0) {
            this.isGrounded = true; 
            this.ySpeed = 0; 
            this.setFoot(touchedPlatHeight);
            this.doubleJumpCount = 1;
        }else if(this.isGrounded == false) {
            this.ySpeed -= this.gravity;

            if(this.ySpeed < -this.terminalVelocity) {
                this.ySpeed = -this.terminalVelocity;
            }
            this.y -= this.ySpeed;
        }

        console.log("isGrounded : "+this.isGrounded);
        console.log("touchedPlatHeight : "+touchedPlatHeight);


        
    }
    /**
     * 
     * @param {*} platform 
     * @returns this returns whether the player is touching the specified 
     * platform parameter as a boolean value
     */

    this.isTouchingPlatform = function(platform) {
        var upBound = this.y + this.height;
        var downBound = upBound + 1;
        var leftBound = this.x;
        var rightBound = this.x +this.width; 

        var platUpBound = platform.y;
        var platDownBound = platUpBound + platform.height;
        var platLeftBound = platform.x;
        var platRightBound = platLeftBound + platform.width; 

        if(downBound < platUpBound ||leftBound > platRightBound || rightBound < platLeftBound ||upBound > platDownBound) {
            return false;
        }else {
            return true;
        }
    }
    
    /**
     * 
     * @param {*} platformList 
     * @returns Checks the whole platform list for intersection and returns the
     * y height at which the player['s foot should be set too
     */

    this.totalTouchingPlatCheck = function(platformList) {
        for(var i = 0; i< platformList.length; i++) {
            if(this.isTouchingPlatform(platformList[i])) {
                return platformList[i].y;
            } 
        }
        return -1;
    }

    /**
     * 
     * @param {*} height 
     * this sets the foot of the character to the specified height
     */

    this.setFoot = function(height) {
        this.y = height - this.height;
    }

    this.draw = function() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x,this.y, this.width, this.height);
    }
}