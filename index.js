const express = require('express');
const admin = require('./server/routes/admin');
const student = require('./server/routes/student');
const clas = require('./server/routes/clas');
const teacher = require('./server/routes/teacher');
const path = require('path');
require('./server/db/mongoose');

const app=express()

app.use(express.json())
app.use('/api/admin',admin)
app.use('/api/student',student)
app.use('/api/class',clas)
app.use('/api/teacher',teacher)







 

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log('server is running port :',port);
    
})