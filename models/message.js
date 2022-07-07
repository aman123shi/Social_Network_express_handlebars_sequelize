module.exports=(sequelize,DataType)=>{
    const Message= sequelize.define("Messages" ,{
          id:{
              type:DataType.INTEGER,
              primaryKey:true,
              autoIncrement:true
          },
            sender:{
                type:DataType.INTEGER,
                allowNull:false,
                validate:{
                  notEmpty:true  
                }
            },
            content:{
                type:DataType.STRING,
                allowNull:false,
                validate:{
                  notEmpty:true  
                }
            }
          
    }
    
    );
  
    return Message;
}
