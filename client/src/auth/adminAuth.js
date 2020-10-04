const jwt = require('jsonwebtoken')
const verify=(token)=>{
    try {
        const admin= jwt.verify(token,process.env.AdminToken)
    if (admin){
        return admin
    }
    return null
    } catch (error) {
        return(null)
    }
}
module.exports= verify