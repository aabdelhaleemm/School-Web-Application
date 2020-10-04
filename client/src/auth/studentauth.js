const jwt = require('jsonwebtoken')
const studentauth=(token)=>{
    try {
        const student= jwt.verify(token,process.env.USERTOKEN)
    if (student){
        return student
    }
    return null
    } catch (error) {
        return(null)
    }
}
module.exports= studentauth