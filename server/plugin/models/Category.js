const mongoose=require('mongoose')
 const  Sch =new mongoose.Schema({
     name:{
         type:String
     },
     parent:
         {
             type:mongoose.SchemaTypes.ObjectId,
             ref:'test'
     }
 })
  module.exports=mongoose.model('test',Sch)