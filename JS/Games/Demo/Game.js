//***************************************************************************
// Filename: Demo/Game.js
// Description: Demo code.
// Author: Joseph Cameron
//***************************************************************************
// CHANGELOG
//
// Date: March 7th, 2015
// Description: Initial implementation.
// Author: Joseph Cameron
//

function drawTest() //Move somewhere else once game includes have been converted to iframe bundles
{
    //*************
    // Marshal data
    //*************
    //Graphics
    var glContext        = GRAPHICS.getContext();
    //Time
    var time             = TIME.getTime();//should be moved
    //Current camera
    var viewMatrix       = GRAPHICS.getViewMatrix();//This should be part of a camera
    var projectionMatrix = GRAPHICS.getProjectionMatrix();//this should be part of a camera
    //This gameobject
    var VertexArray      = this.getVertexBuffer();
    var shaderProgram    = this.getShader();
    var texture          = this.getMainTexture();
    //Model Scale
    var modelScale = this.getGameObject().getTransform().getLocalScaleMatrix();
    //Model Rotation
    var rotation   = this.getGameObject().getTransform().getLocalRotationMatrix();
    //This transform
    var object2WorldMatrix = this.getGameObject().getTransform().getWorldMatrix();   
    
    //console.log(this.getGameObject().getName().toString() + ", " + shaderProgram.getName() + ", " + texture.getName());
    
    //********************
    // Prepare vertex data
    //********************
    glContext.bindBuffer( glContext.ARRAY_BUFFER, VertexArray );
    
    glContext.vertexAttribPointer
    (
        shaderProgram.vertexPositionAttribute,
        3, //Pos size
        glContext.FLOAT,
        false, 
        4*(3+2), //stride is size of vertex format in bytes. 4 is float size, 3 pos, 2 uv 
        0 
    
    );
    
    //UV attribute pointer
    glContext.vertexAttribPointer
    (
        shaderProgram.uvAttribute,
        2, //UV size
        glContext.FLOAT,
        false, 
        4*(3+2), //stride is size of vertex format in bytes. 4 is float size, 3 pos, 2 uv 
        4*3 
    
    );
    
    //
    // Prep context
    //
    glContext.enable(glContext.DEPTH_TEST);
    glContext.enable(glContext.CULL_FACE);
    glContext.disable(glContext.CULL_FACE);
    glContext.cullFace(glContext.BACK);
    
    //
    // Prep shader
    //
    glContext.useProgram(shaderProgram);
        
    shaderProgram.vertexPositionAttribute = glContext.getAttribLocation( shaderProgram, "vPos" );
    glContext.enableVertexAttribArray( shaderProgram.vertexPositionAttribute);
    
    shaderProgram.uvAttribute             = glContext.getAttribLocation( shaderProgram, "vUV"  );
    glContext.enableVertexAttribArray( shaderProgram.uvAttribute            );
    
    //
    // Pass in uniform data
    //
    //Time uniform
    var uTime = glContext.getUniformLocation(shaderProgram,"_Time");
    if (uTime != -1)
        glContext.uniform1f(uTime, time);
    
    //ModelScale uniform
    var uModelScaleMatrix = glContext.getUniformLocation(shaderProgram,"_ModelScaleMatrix");
    if (uModelScaleMatrix != -1)
        glContext.uniformMatrix4fv(uModelScaleMatrix, false, modelScale);
    
    //ModelRotation uniform
    var uModelRotationMatrix = glContext.getUniformLocation(shaderProgram,"_ModelRotationMatrix");
    if (uModelRotationMatrix != -1)
        glContext.uniformMatrix4fv(uModelRotationMatrix, false, rotation);
        
    //Model translation matrix uniform
    var uObject2WorldMatrix = glContext.getUniformLocation(shaderProgram,"_Object2WorldMatrix");
    if (uObject2WorldMatrix != -1)
        glContext.uniformMatrix4fv(uObject2WorldMatrix, false, object2WorldMatrix);
        
    //View matrix uniform
    var uViewMatrix = glContext.getUniformLocation(shaderProgram,"_ViewMatrix");
    if (uViewMatrix != -1)
        glContext.uniformMatrix4fv(uViewMatrix, false, viewMatrix);
        
    //Projection matrix uniform
    var uProjectionMatrix = glContext.getUniformLocation(shaderProgram,"_ProjectionMatrix");
    if (uProjectionMatrix != -1)
        glContext.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix);
    
    //Texture uniform
    glContext.activeTexture(glContext.TEXTURE0);
    glContext.bindTexture  (glContext.TEXTURE_2D, texture);
    glContext.uniform1i    (glContext.getUniformLocation(shaderProgram, "_Texture"), 0);

    //
    // draw
    //
    glContext.drawArrays( glContext.TRIANGLES, 0, VertexArray.numItems );
    
};

Game.prototype = new GameBase();
Game.prototype.constructor = Game;

function Game()
{    
    //***************
    // Game interface
    //***************
    this.start = function()
    {
        //this.initializeRootGameObject();
        
        //Init test object 1
        var gameObject = new GameObject();
        {
            gameObject.setName("QuadTest");    
            gameObject.getMesh().draw = drawTest;
            gameObject.getMesh().setVertexBuffer(GRAPHICS.getQuadVertexArray());
            gameObject.getMesh().setMainTexture(GRAPHICS.getTextures()[0]);
            gameObject.getTransform().setPosition([0,0,-10]);
        
        }
        this.m_RootGameObject.getChildren().push(gameObject);
        
        //Init test object 2
        var whatIsJavaScript = new GameObject();
        {
            whatIsJavaScript.setName("CubeTest");    
            whatIsJavaScript.getMesh().draw = drawTest;
            whatIsJavaScript.getMesh().setShader(GRAPHICS.getShader("Opaque"));
            whatIsJavaScript.getMesh().setMainTexture(GRAPHICS.getTextures()[1]);
            whatIsJavaScript.getTransform().setPosition([2,1,-10]);
        
        }
        this.m_RootGameObject.getChildren().push(whatIsJavaScript);
        
        //Init test object 3
        var test3 = new GameObject();
        {
            test3.setName("TriTest");    
            test3.getMesh().draw = drawTest;
            test3.getMesh().setVertexBuffer(GRAPHICS.getTriVertexArray());
            test3.getTransform().setPosition([-10,10,-30]);
        
        }
        this.m_RootGameObject.getChildren().push(test3);
        
        //Init ground
        var groundObject = new GameObject();
        {
            groundObject.setName("Ground");    
            groundObject.getMesh().draw = drawTest;
            groundObject.getMesh().setShader(GRAPHICS.getShader("Opaque"));
            groundObject.getMesh().setMainTexture(GRAPHICS.getTextures()[2]);
            groundObject.getTransform().setPosition([0,-2,-25]);
            groundObject.getTransform().setScale([50,1,50]);
        
        }
        this.m_RootGameObject.getChildren().push(groundObject);
                
    };

}









