const mongoose=require('mongoose')
 const  Sch =new mongoose.Schema({
         name: {
             type: String
         },
img: {type: String},
url: {
    type: String}}

 )
  module.exports=mongoose.model('Ad',Sch)