const express = require('express')
const clas=require('../models/clas')
const adminauth = require('../middleware/adminauth');
const router = new express.Router()

router.post('/add',adminauth,async(req,res)=>{
    try {
        const cla=new clas(req.body)
        await cla.save()
       res.status(200).send(cla)

    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/homework/:classno',adminauth,async(req,res)=>{
    try {
        const cl=await clas.findOne({classNo:req.params.classno})
        res.send(cl.homwork)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/homework/:classno',adminauth,async(req,res)=>{
    try {
        const cla=await clas.findOne({classNo:req.params.classno})
        cla.homwork.push({...req.body,teachername:req.user.name})
        await cla.save()
        res.send(cla.homwork)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/schedule/:classno',adminauth,async(req,res)=>{
    try {
        const cla=await clas.findOne({classNo:req.params.classno})
        cla.schedule.push(req.body)
        await cla.save()
        res.send(cla.schedule)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/schedule/:classno',adminauth,async(req,res)=>{
    try {
        const cla=await clas.findOne({classNo:req.params.classno})
        res.send(cla.schedule)
    } catch (error) {
        res.status(400).send(error)
    }
})




module.exports = router