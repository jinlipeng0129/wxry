const  express=require('express')
const app=express()
app.set('secret','jin')
app.use(require('cors')())
app.use(express.json())
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use('/Herosicon',express.static(__dirname+'/Herosicon'))
app.use('/skillupload',express.static(__dirname+'/skillupload'))
require('../server/router/admin/index.js')(app)
require('../server/router/web/web.js')(app)
// const  Category=require('../server/plugin/models/Category.js')
require('../server/plugin/db.js')()
 // app.post('/admin/api/categorise',async (req,res)=>{
 //         const model= await Category.create({name:`"${req.body.name}"`});
 //         res.send(req.body.name);
 //     }
 //         )

app.listen(3000,()=>{
    console.log(1)

})
// const mongoose=require('mongoose')
//
//  let por=new Promise((resolve, reject)=>{
//      mongoose.connect('mongodb://localhost:27017/node',{ useNewUrlParser: true } )
//      mongoose.connection.on('open',(err)=>{
//          if(!err)
//          {
//              resolve()
//          }
//          else {
//              console.log(err)
//              reject(err)
//          }
//      })
// })
//
// const Schem=mongoose.Schema
// let stu=new Schem({
//      name:{
//          type:String
//      }
// })
//  let modlew= mongoose.model('test',stu)
// ;(async ()=>{
//     await  por
//    let m= await modlew.create({name:'jin'})
//     console.log(m);
// })()