import { Player } from './player.js';

//yes, i figured out how to read a json file in javascript in node, and I figured out how to access fields like python dict
//never should have doubted the javascript language

// let player1 = new Player("./firstsm.json");

// console.log("Player1 state machine is: \n" , player1.state_machine);

// console.log("Fine Details: ", player1.state_machine["idle"]["properties"]);

//cool, now I can create whatever state machine I want with python and then load it into javascript

//so it saves the array values in the json file too, and just abbreviatesit as Array

// console.log("Fine Details: ", player1.state_machine["idle"]["properties"]["xspeed"][0].length);

//the timeline property 

//test javascript dictionaries

let hello = {};

hello["chicken"] = 2;
hello["rubber"] = [1,2,3];

console.log(hello, hello["chicken"]);

//objects in javascript work the exact same as dictionaries in python. 

// let x = new Boolean(false);

// if(x.valueOf()) {
//     console.log("Shit nigga");
//     console.log(x.toString());
// }

let x = 5;

console.log(x.valueOf());


let chick = [];

console.log(chick.indexOf(6));

// if(typeof list.find(8) !== 'undefined') {
//     console.log("hey");
// }else {
//     console.log("Hey nigga");
// }

//in java script all primitives have the valueof function
