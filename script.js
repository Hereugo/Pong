var RESTART;
var HORIZONTAL_WALL;
var VERTICAL_WALL;

var ball;

var player1, player2;

function setup() {
    createCanvas(500, 300).center();
    HORIZONTAL_WALL = createVector(0, 1);
    VERTICAL_WALL = createVector(1, 0);
    RESTART = false;
    ball = new ball(width/2, height/2);
    player1 = new player(10, height/2, "1-Player", 1);
    player2 = new player(width-20, height/2, "2-Player", 2);
}

function draw() {
    background(51);
    ball.run();
    player1.run();
    player2.run();
}