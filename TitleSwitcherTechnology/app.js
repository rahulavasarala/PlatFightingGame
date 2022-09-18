var char_loop;
var game_loop;
var charSelectRunner;
var gameRunner;


window.onload = function() {

    console.log("Loaded Explorer");
    init();

}

function toGame() {

    clearInterval(char_loop);

    let char_page = document.getElementById("char_page");
    let game_page = document.getElementById("game_page");

    char_page.style.display = "none";
    game_page.style.display = "block";

    gameRunner = new GameHandler();

    game_loop = setInterval(stepGame, 1000/60);

}

function init() {

    let char_page = document.getElementById("char_page");
    let game_page = document.getElementById("game_page");

    char_page.style.display = "block";
    game_page.style.display = "none";

    charSelectRunner = new CharHandler();

    char_loop = setInterval(stepCharSelect, 1000/60);

}

function stepGame() {
    gameRunner.step();
}

function stepCharSelect() {
    charSelectRunner.step();
}

function toCharacterSelect() {

    clearInterval(game_loop);

    let char_page = document.getElementById("char_page");
    let game_page = document.getElementById("game_page");

    char_page.style.display = "block";
    game_page.style.display = "none";

    charSelectRunner = new CharHandler();

    char_loop = setInterval(stepCharSelect, 1000/60);


}

