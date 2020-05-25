const mongoose=require('mongoose')
 const  Sch =new mongoose.Schema({
     name:{
         type:String
     },
     banner:{
         type:String
     },

     icon:{type:String},
     title:{type:String},
     avatar:{type:String},
     categroies:[{type:mongoose.SchemaTypes.ObjectId, ref:'test'}],
     scores:{
         difficult:{type:Number} ,
         skills:{type:Number} ,
         attack:{type:Number} ,
         survive:{type:Number} ,
     },
     skills: [{
         icon:{type:String},
         name:{type:String},
         description:{type:String},
         tips:{type:String},
         dely:{type:String},
         cost:{type:String}
     }],
     items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
     items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
     usageTips:{type:String},
     battleTips:{type:String},
     teamTips:{type:String},
     partens:[{hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},  description:{type:String}}]
 })
  module.exports=mongoose.model('Hero',Sch,'heroes')