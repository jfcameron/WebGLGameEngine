//***************************************************************************
// Filename: GameBase.js
// Description: Behaviors and data inherited by all Game objects.
//  Children of Game serve as the gameplay coding environment for
//  that game.
//  GameBase abstracts away boilerplate game code.
//  The various /Game/GAMENAME/Game.js files only defines
//  code for that game. They do not also initialize the engine.
// Author: Joseph Cameron
//***************************************************************************
// CHANGELOG
//
// Date: March 6st, 2015
// Description: Initial implementation.
// Author: Joseph Cameron
//
// Date: March 7th, 2015
// Description: Split Game.js into GameBase.js, Game.js.
//  
// Author: Joseph Cameron
//

function GameBase()
{        
    //*************
    // Data members
    //*************
    this.m_RootGameObject = null;
    
    //***************
    // Game interface
    //***************
    this.superStart = function()
    {
        this.m_RootGameObject = new GameObject();
        this.m_RootGameObject.setName("RootGameObject");
    
    };
    
    this.start = function()
    {
        initializeRootGameObject();
                
    };
    
    this.update = function()
    {
        this.m_RootGameObject.update();
        
    };
    
}







