const mongoose=require('mongoose')
 const  Sch =new mongoose.Schema({
     name:{
         type:String
     },
     icon:{type:String}
 })
  module.exports=mongoose.model('Item',Sch)