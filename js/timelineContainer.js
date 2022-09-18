/**
 * this object stores data and a startFrame and an EndFrame,
 * it is going to be used for the timelines
 * @param {} input 
 * @param {*} endFrame 
 * @param {*} startFrame 
 */

function timelineContainer(input, startFrame, endFrame) {


    this.data = input;
    this.endFrame = endFrame;
    this.startFrame = startFrame;

    this.getData = function() {
        return this.data;
    }

}