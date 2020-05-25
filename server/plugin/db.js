module.exports=()=>{
    const mongoose=require('mongoose')
    mongoose.connect('mongodb://localhost:27017/node',{ useNewUrlParser: true ,useUnifiedTopology: true} )
      require('require-all')(__dirname+'/../plugin/models')
}
