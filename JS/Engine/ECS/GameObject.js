//***************************************************************************
// Filename: GameObject.js
// Description: Central object in ECS strategy
//  Read http://en.wikipedia.org/wiki/Entity_component_system
//  or better yet, go download Unity.
// Author: Joseph Cameron
//***************************************************************************
// CHANGELOG
//
// Date: March 6st, 2015
// Description: Initial implementation.
// Author: Joseph Cameron
//
function GameObject()
{
    //*************
    // Data members
    //*************
    var m_Name      = "GameObject";
    var m_Transform = new Transform(this);
    var m_Mesh      = new Mesh(this);
	var m_Rigidbody = new Rigidbody(this);
    var m_Behaviors = []  ;
    var m_Children  = []  ;
    var m_Parent    = null;
    
    //**********
    // Accessors
    //**********
    this.getName = function()      {return m_Name ;};
    this.setName = function(aName) {m_Name = aName;};
    
    this.getTransform = function(){return m_Transform;};
    this.getMesh      = function(){return m_Mesh     ;};
	this.getRigidbody = function(){return m_Rigidbody;};
    this.getBehaviors = function(){return m_Behaviors;};
    this.getChildren  = function(){return m_Children ;};
    
    //*********************
    // GameObject interface
    //*********************
    this.update = function()
    {
        //console.log(this.getName() + ": " +this.getTransform().getPosition());
        //console.log(this.getName() + ", " + this.getMesh().getGameObject().getName());
    
         m_Mesh.update();
		 m_Rigidbody.update();
    
        for(var i = 0; i < m_Behaviors.length; i++)
            m_Behaviors[i].update();
            
        for(var i = 0; i < m_Children.length; i++)
            m_Children[i].update();
        
    };
    
}



