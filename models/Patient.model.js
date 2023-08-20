const mongoose=require('mongoose')

const PatientSchema=new mongoose.Schema({
    //validar como RUN
    run:{
        type: String,
        required: true,
        unique: true,
        index: true,
    },
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
    address:{ 
        name_street:{
            type: String,
            required: true,
            validate: {
                validator:function(v){
                    return /^[a-zA-Z0-9 ]{3,30}$/.test(v)
                },
            }
        },
        number_street:{
            type: Number,
            require: true,
        },
        department:{
            type: String,
            required: false,
        },
        city:{
            type: String,
            required: true,
            validate: {
                validator:function(v){
                    return /^[a-zA-Z0-9 ]{3,30}$/.test(v)
                },
            }
        },
        region:{
            type: String,
            required: true,
            validate: {
                validator:function(v){
                    return /^[a-zA-Z0-9 ]{3,30}$/.test(v)
                },
            }
        },
    },
    email:{
        type: String,
        require: false,
        unique: false,
        index: true,
        validate: {
            validator:function(v){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
            },
        }
    },
    phone:{
        type: Number,
        require: false,
    },
    sessions_id:{
        type: Array,
        require: false,
        default: []
    },
},{
    timestamps:true
})

const Patient=mongoose.model('Patient',PatientSchema)
module.exports=Patient