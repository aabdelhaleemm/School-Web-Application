const mongoose = require('mongoose');
const clasSchema= new mongoose.Schema({
    classname:{
        type:String,
        required:true,
        unique:true
    },
    classNo:{
        type:Number,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    studentNo:{
        type:Number,
        default:0
    },
    schedule:[{
        day:String,
        object:[]
    }],
    homwork:[{
        object:{
            type:String
        },
        work:{
            type:String
        },
        time:{
            type:String
        },
        teachername:{
            type:String
        }
    }]
})

const clas = mongoose.model('classes',clasSchema)
module.exports =clas
