const express = require('express')
const students=require('../models/student')
const clas=require('../models/clas')
const adminauth = require('../middleware/adminauth');
const studentauth = require('../middleware/studentauth');
const jwt = require('jsonwebtoken');
const router = new express.Router()



router.get('/schedule',studentauth,async(req,res)=>{
    try {
        const cla = await clas.findOne({classNo:req.student.classNo})
        res.send(cla.schedule)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/homework',studentauth,async(req,res)=>{
    try {
        const cla = await clas.findOne({classNo:req.student.classNo})
        res.send(cla.homwork)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.post('/login',async(req,res)=>{
    try {
        const student=await students.findOne({...req.body})
        if(!student){
            return res.status(404).json("Invalid username or password")
        }
        const token = jwt.sign(student.id,process.env.USERTOKEN)
        res.status(200).json({token,name:student.name})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/me',studentauth,async(req,res)=>{
    try {
        
        res.send(req.student)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.post('/register',adminauth,async(req,res)=>{
try {
    const cla= await clas.findOne({classNo:req.body.classNo})
    const student = new students({...req.body,password:parseInt((""+Math.random()).substring(2,6))})
    if(!req.body.amount){
        student.amount = cla.price
    }
    cla.studentNo += 1
    student.classname=cla.classname
    await student.save()
    cla.save()
    res.send(student)
   
} catch (error) {
    res.status(400).send(error)
}
})

router.get('/:classNo',adminauth,async(req,res)=>{
    try {
        const student = await students.find({classNo:req.params.classNo})
        
        res.send(student)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/pay/:nid',adminauth,async(req,res)=>{
    try {
        const student = await students.findOne({nid:req.params.nid})
        if(!student){
            res.status(404)
        }
        res.send(student)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.post('/pay/:nid',adminauth,async(req,res)=>{
    try {
        const student = await students.findOne({nid:req.params.nid})
        await student.pay.push({...req.body})
         student.totalpaied +=parseInt(req.body.money) 
        await student.save()
        const studen = await students.findOne({nid:req.params.nid})
       res.send(studen)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/',adminauth,async(req,res)=>{
    try {
        const student = await students.find()
        res.send(student)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router