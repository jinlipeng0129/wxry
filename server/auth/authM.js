module.exports=(option)=>{
    return async(req,res,next)=>{
        const jwt=require('jsonwebtoken')
        const assert=require('http-assert')
        const  Adminuser=require('../plugin/models/AdminUser')
        const token=String(req.headers.authorization||'').split(' ').pop()
        console.log(255)
        console.log(req.headers.authorization)
        console.log(token)
        console.log(255)
        assert(token,401,'未授权')
        console.log(55)
        const {id}=jwt.verify(token,req.app.get('secret'))
        assert(id,401,'未授权')
        console.log(25)
        req.user=await Adminuser.findById(id)
        assert(req.user,402,'请先登录')
        console.log(422)
        await next()
    }
}