const mongoose=require('mongoose')

const ConsultationSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator:function(v){
                return /^[a-zA-Z0-9 ]{3,30}$/.test(v)
            },
        }
    },
    duration:{
        type: Number,
        require: true,
    },
    price:{
        type: Number,
        require: true,
    },
    state:{ 
        type: Boolean,
        require: true,
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator:function(v){
                return /^[a-zA-Z0-9 ]{3,300}$/.test(v)
            },
        }
    },
},{
    timestamps:true
})

const Consultation=mongoose.model('Consultation',ConsultationSchema)
module.exports=Consultation