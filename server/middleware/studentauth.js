const jwt = require('jsonwebtoken');
const students=require('../models/student')

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        if (!token) {
            res.status(401).send("no token found")
            next()
        }
        const decoded = jwt.verify(token,process.env.USERTOKEN)
        const user =await students.findOne({_id:decoded})
        req.student= user
        next()
    }
    catch (e) {
        res.status(401).send(e)
    }
}
module.exports=auth