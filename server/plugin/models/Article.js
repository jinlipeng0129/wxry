const mongoose=require('mongoose')
 const  Sch =new mongoose.Schema({

     title:{type:String},
     categroies:[{type:mongoose.SchemaTypes.ObjectId, ref:'test'}],
      body:{type:String}
 },{
     timestamps:true
 })
  module.exports=mongoose.model('Article',Sch)