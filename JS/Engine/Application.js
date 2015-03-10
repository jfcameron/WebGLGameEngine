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
    //Init GRAPHICS
    GRAPHICS = new Graphics();
    GRAPHICS.start();

    //init TIME
    TIME = new Time();
    TIME.start();

    //Init INPUT
    INPUT = new Input();
    INPUT.start();

    //Init PHYSICS
	PHYSICS = new Physics();
	PHYSICS.start();

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
	GRAPHICS.update();

    if (GAME != undefined)
        GAME.update();

    TIME   .update();
    INPUT  .update();
	PHYSICS.update();
    
    
    

}



