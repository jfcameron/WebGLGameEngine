function Rigidbody(aOwnerGameObject)
{
	//*************
	// Data members
	//*************
	var m_GameObject = aOwnerGameObject; //Reference to owner
	var m_Body       = null; //Reference to the rigidbody in the physics simulation
	var m_Mass       = null; //0 marks static
	var m_Shape      = null; //Collider shape
	//var m_Material   = null;
	
	
	//**********
	// Accessors
	//**********
	this.getGameObject = function(){return m_GameObject;  };
	
	this.getMass = function(){return m_Mass ;};
	this.setMass = function(aMass){m_Mass = aMass;};
	
	this.getShape = function(){return m_Shape;};
	this.setShape = function(aShape){m_Shape = aShape;};
	
	//********************
	// Rigidbody interface
	//********************
	this.init = function()
	{
        //Calculate size
        m_Shape.halfExtents.x = m_GameObject.getTransform().getScale()[0]/2;
        m_Shape.halfExtents.y = m_GameObject.getTransform().getScale()[1]/2;
        m_Shape.halfExtents.z = m_GameObject.getTransform().getScale()[2]/2;
        m_Shape.updateConvexPolyhedronRepresentation();
    
		m_Body = new CANNON.Body({mass: m_Mass});
        m_Body.addShape(m_Shape);
        
        //Calculate initial pos
        m_Body.position.x = m_GameObject.getTransform().getPosition()[0];
        m_Body.position.y = m_GameObject.getTransform().getPosition()[1];
        m_Body.position.z = m_GameObject.getTransform().getPosition()[2];
		
		PHYSICS.add(m_Body); //Add to sim
        
	};
	
	this.update = function()
	{
		if (m_Body != undefined && m_Body.mass != 0)//Is dynamic
        {
			m_GameObject.getTransform().setPosition([parseFloat(m_Body.position.x),parseFloat(m_Body.position.y),parseFloat(m_Body.position.z)]);
            //m_GameObject.getTransform().setRotation(
            
            var rotationBuffer = new CANNON.Vec3();
            m_Body.quaternion.toEuler(rotationBuffer,"YZX");
            
            var xyzBuffer = [rotationBuffer.z,rotationBuffer.x,rotationBuffer.y];
            
            m_GameObject.getTransform().setRotation(xyzBuffer);
            
        }
        
	};

}









