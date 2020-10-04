const express = require('express')
const teachers = require('../models/teacher');
const jwt = require('jsonwebtoken');
const AdminAuth = require('../middleware/adminauth');
const router = new express.Router()


router.post('/login',async(req,res)=>{
    try {
        const admin=await admins.findOne({...req.body})
        if(!admin){
            return res.status(404).json("Invalid username or password")
        }
        const token = jwt.sign(admin.id,process.env.jwtToken)
        res.status(200).json({token,userName:admin.userName})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/register',AdminAuth,async(req,res)=>{
    try {
    const teacher = new teachers({...req.body,password:parseInt((""+Math.random()).substring(2,6))})
   
    await teacher.save()
    
    res.status(200).send(teacher)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/",AdminAuth,async(req,res)=>{
    try {
        const teacher =await teachers.find() //.select("-password")
        res.send(teacher)
    } catch (error) {
        res.status(404).send(error)
    }
})
router.get("/:nid",AdminAuth,async(req,res)=>{
    try {
        const teacher =await teachers.findOne({nid:req.params.nid})
        res.json([teacher])
    } catch (error) {
        res.status(404).send(error)
    }
})


module.exports = router