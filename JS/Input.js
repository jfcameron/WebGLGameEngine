//*************************************
// Filename: Input.js
// Description: Handles user input.
// Author: Joseph Cameron
//*************************************
// CHANGELOG
//
// Date: March 5th, 2015
// Description: Initial implementation.
// KeyUp and KeyDown events handled.
// Author: Joseph Cameron
//
//example input event
//if (input.getKeys()[37])
//{
//    alert("hi");
//
//}

function Input()
{
    //*************
    // Data members
    //*************
    var m_Keys = {};
    
    //****************
    // Input interface
    //****************
    this.start = function()
    {
        document.onkeydown = keyDown;
        document.onkeyup   = keyUp;
    
    };
    
    this.getKeys = function()
    {
        return m_Keys;
    
    };
    
    //****************
    // Private methods
    //****************
    keyDown = function (event)
    {
        m_Keys[event.keyCode] = true;
        
    };

    keyUp = function (event)
    {
        m_Keys[event.keyCode] = false;
        
    };    
    
}



