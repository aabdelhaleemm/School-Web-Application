const express = require('express')
const admins = require('../models/admin');
const AdminAuth=require('../middleware/adminauth')
const jwt = require('jsonwebtoken');
const router = new express.Router()


router.post('/register',AdminAuth,async(req,res)=>{
    try {
    const admin = new admins(req.body)
    await admin.save()

    res.status(200).send(admin)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login',async(req,res)=>{
    try {
        const admin=await admins.findOne({...req.body})
        if(!admin){
            return res.status(404).json("Invalid username or password")
        }
        const token = jwt.sign(admin.id,process.env.AdminToken)
        res.status(200).json({token,name:admin.name})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/",async(req,res)=>{
    try {
        const admin =await admins.find() //.select("-password")
        res.send(admin)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router