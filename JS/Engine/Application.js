//*****************
// Global variables
//*****************
var INPUT    = null;
var GRAPHICS = null;
var GAME     = null;
var TIME     = null;

//********************
// Program entry point
//********************
function Start()
{
    //init TIME
    TIME = new Time();
    TIME.start();

    //Init INPUT
    INPUT = new Input();
    INPUT.start();

    //Init GRAPHICS
    GRAPHICS = new Graphics();
    GRAPHICS.start();

    //Init GAME
     GAME = new Game();
     GAME.superStart();
     GAME.start();
     
}

//**********
// Main loop
//**********
function Update()
{
    TIME.update();
    GRAPHICS.update();
    
    if (GAME != undefined)
        GAME.update();

}



