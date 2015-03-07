function Time()
{
    var m_Time = 0;
    
    this.getTime = function()
    {
        return m_Time;
        
    };
    
    this.update = function()
    {
        m_Time++;
        
    };
    
}