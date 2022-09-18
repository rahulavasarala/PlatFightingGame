//basically the whole idea is, make a bunch of div tags in the html file, and each of these will represent a page. Create a start game 
//screen and load the game screen which is blue
//make a start middle and end screen

//game.css is for formatting all of the pages in the html document

window.onload = function() {

    console.log("Explorer.onload");
    toStart();
}


function toStart() {

    let startDiv = document.getElementById("start");
    let middleDiv = document.getElementById("middle");
    let restartDiv = document.getElementById("restart");

    startDiv.style.display = "block";
    middleDiv.style.display = "none";
    restartDiv.style.display = "none";

}

function toMiddle() {

    let startDiv = document.getElementById("start");
    let middleDiv = document.getElementById("middle");
    let restartDiv = document.getElementById("restart");

    startDiv.style.display = "none";
    middleDiv.style.display = "block";
    restartDiv.style.display = "none";

}

function toEnd() {

    let startDiv = document.getElementById("start");
    let middleDiv = document.getElementById("middle");
    let restartDiv = document.getElementById("restart");

    startDiv.style.display = "none";
    middleDiv.style.display = "none";
    restartDiv.style.display = "block";

}