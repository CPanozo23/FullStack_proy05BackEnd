const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        validate: {
            validator:function(v){
                return /^[a-zA-Z0-9 ]{3,30}$/.test(v)
            },
        }
    },
    lastName:{
        type: String,
        required: true,
        validate: {
            validator:function(v){
                return /^[a-zA-Z0-9 ]{3,30}$/.test(v)
            },
        }
    },
    birthday:{
        type: Date,
        require: true,
    },
    phone:{
        type: Number,
        require: true,
    },
    address:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
        index: true,
        validate: {
            validator:function(v){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
            },
        }
    },
    password:{
        type: String,
        require: true,
    },
    type:{
        type: Number,
        require: true,
    },
    sessions:{
        type:Number,
        require: true
    },
    purchases:{
        type: Number,
        require: true,
    },
    products:{
        type: Number,
        require: true,
    },
    

},{
    timestamps:true
})

const User=mongoose.model('User',UserSchema)


module.exports=User