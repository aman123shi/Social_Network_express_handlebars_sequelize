module.exports=(sequelize,DataType)=>{
    const Conversation= sequelize.define("Conversations" ,{
          u1id:{
              type:DataType.INTEGER
            
          },
          u2id:{
            type:DataType.INTEGER
          
        },
        msgid:{
            type:DataType.INTEGER 
        }
    
    }
    );

return Conversation;
    }