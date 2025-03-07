const jwt=require('jsonwebtoken')
const config=require('./global')

function verifyToken(req,res,next){
    const token=req.headers['x-access-token']

    if(!token){
        return res.status(400).json({
            auth:false,
            message:'No tiene token'
        })
    }
    const decoded=jwt.verify(token,config.secret)
    req.userId=decoded.id
    next()
}
module.exports=verifyToken