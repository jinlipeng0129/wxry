module.exports=(app)=>{
    //const  Category=require('../../../server/plugin/models/Category')
    const  express=require('express')
    const jwt=require('jsonwebtoken')
    const assert=require('http-assert')
    const  Adminuser=require('../../plugin/models/AdminUser')
    const  Category=require('../../plugin/models/Category')
    const  Item=require('../../plugin/models/Item')
    const  Hero=require('../../plugin/models/Hero')
    const  routers= express.Router({
        mergeParams:true
    })
      routers.post('/',async (req,res)=>{

         const model= await  req.Model.create(req.body)
         res.send(model)
    })
    routers.get('/',async (req,res)=>{
        let queryOpations={};
        if(req.Model.modelName==='test')
        {
            queryOpations.populate='parent'
        }
        const model= await  req.Model.find().setOptions(queryOpations).limit(100)
        console.log(model)
        res.send(model)
    })
    routers.get('/:id',async (req,res)=>{
        const model= await  req.Model.findById(req.params.id)
        //  const modelName=require('inflection').classify(req.params.resource)
        //  const  Model=require(`../../../server/plugin/models/${modelName}`)
        res.send(model)
    })

    routers.put('/:id',async (req,res)=>{
        const model= await  req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    routers.delete('/:id',async (req,res)=>{
        const model= await  req.Model.findByIdAndDelete(req.params.id)
        console.log(req.params.id)
        res.send({
            success:true
        })

    })
    const auth=require('../../auth/authM.js')
   app.use('/admin/api/rest/:resource',auth(),async (req,res,next)=>{
       const modelName=require('inflection').classify(req.params.resource)
       req.Model=require(`../../../server/plugin/models/${modelName}`)
       next()
   },routers)

    const  multer=require('multer')
    const upload=multer({dest:__dirname+'/../../uploads'})
    const Herosicon=multer({dest:__dirname+'/../../Herosicon'})
    const skillupload=multer({dest:__dirname+'/../../skillupload'})
     console.log(__dirname+'/../../uploads')
      app.post('/admin/api/upload',auth(),upload.single('file'),async (req,res)=>{
        const file=req.file
      console.log(file.filename+"123")
        file.url=`http://localhost:3000/uploads/${file.filename}`
         res.send(file)
  })
      app.post('/admin/api/check',auth(),async (req,res)=>{
        const y=await Adminuser.find({username: req.body.username})
        res.send(y)
    })
    app.post('/admin/api/checkcategories',auth(),async (req,res)=>{
        const data=await Category.find({name: req.body.name})
        res.send(data)
    })
    app.post('/admin/api/checkitems',auth(),async (req,res)=>{
        const data=await Item.find({name: req.body.name})
        res.send(data)
    })
    app.post('/admin/api/checkheros',auth(),async (req,res)=>{
        const data=await Hero.find({name: req.body.name})
        res.send(data)
    })
    app.post('/admin/api/herosicon',auth(),Herosicon.single('file'),async (req,res)=>{
        const file=req.file
        file.url=`http://localhost:3000/Herosicon/${file.filename}`
        res.send(file)
    })
    app.post('/admin/api/skillupload',auth(),skillupload.single('file'),async (req,res)=>{
        const file=req.file
        console.log(file.filename+"123")
        file.url=`http://localhost:3000/skillupload/${file.filename}`
        res.send(file)
    })
    app.post ('/admin/api/login',async (req,res)=>
    {
        const {username,password}=req.body
        const user=await  Adminuser.findOne({username}).select('+password')
             assert(user,422,'用户不存在')
        const isvalue= require('bcrypt').compareSync(password,user.password)
             assert(isvalue,422,'密码错误')
          const token= jwt.sign({
             id:user._id
         },app.get('secret'))
        res.send({token,user})

    })
    app.use(async (err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })
}
