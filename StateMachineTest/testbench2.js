// import { Player } from './player.js';
// import { ButtonAccordion } from './button_accordion.js'; 
// import { GameButton } from './button_accordion.js';


// let up_b = new GameButton(true);
// let down_b = new GameButton(false);
// let left_b = new GameButton(false);
// let right_b = new GameButton(false);
// let mod1 = new GameButton(false);
// let mod2 = new GameButton(false);

// let ba = new ButtonAccordion(up_b,down_b, left_b, right_b, mod1, mod2);

// console.log(ba.button_dict['up']);

// let player1 = new Player("./firstsm.json",ba);

//need to test out the set events function

        // player1.set_events();

        // console.log("Player1s face is:",player1.property_dict["face_side"])

        // console.log(player1.event_dict);


//so the way to test the state canceller code is basically, make the player frame 6,
//then run the state cancelling code

        // player1.curr_frame = 6;

        // player1.state_canceller();

        // console.log("Last cancel inputs are:", player1.last_cancel_input)

//testing out the  ste_properties method 

        // player1.set_properties();

//now what I need to do is:
//make arrays of all the buttons to suimulate them and test whether the shit is working as planned 

                // let mod1_arr = [false ,false, false, false, false, false, false, false, false, false, false , false];

                // let down_button_arr = [false, false, true, true, false, false, true, true, false, false, false , false];

                // player1.curr_frame = 0;


                // for(var i = 0; i < mod1_arr.length; i++) {
                // console.log("Iteration:", i);
                // mod1.bool = mod1_arr[i];
                // down_b.bool = down_button_arr[i];

                // player1.tick();
                // }

//both test cases pass where the mod1 button arr and the down_button_arr simulating inputs, and crouching mechanic works whenever down is held
//now I need to build a legit test rig with a canvas and make animations for each of the states and see it work

//then I can create a more complicated test bench, with collisions, real animations, and real logic, with a sandbag, and I can post it on my
//demo github

let rubber = false;

console.log(rubber.valueOf())




