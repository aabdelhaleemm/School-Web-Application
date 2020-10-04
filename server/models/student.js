const mongoose = require('mongoose');
const studentSchema= new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    nid:{
        required:true,
        type:Number,
        unique:true,
        validate(v){
            if(v.length > 10 || v.length <10){
                throw new Error('nid should be 10 numbers only')
            }
        }
    },
    password:{
        type:Number
    },
    grade:[{
        object:{
            type:String,
            
        },
        m1:{
            type:Number,
          
        },
        m2:{
            type:Number,
            
        },
        m3:{
            type:Number,
           
        },
    }],
    amount:{
        type:Number
    },
    classname:{

    },
    totalpaied:{
        type:Number,
        default : 0
    },
    pay:[{
        time:{
            type:String,
    
        },
        money:{
            type:Number
        }
    }],
    bus:{

    },
    phone:{

    },
    adress:{

    },
    classNo:{
        
    }
})

const student = mongoose.model('student',studentSchema)
module.exports = student