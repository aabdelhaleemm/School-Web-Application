const mongoose = require('mongoose');

const teacherSchema= new mongoose.Schema({
    nid:{
        type:Number,
        unique:true,
        
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    schedule:[{
        day:{
            type:String
        },
        objects:[{
            time:{
                type:String
            },
            obejct:{
                type:String
            }
        }]
    }]
})

const teacher = mongoose.model('teacher',teacherSchema)

module.exports = teacher