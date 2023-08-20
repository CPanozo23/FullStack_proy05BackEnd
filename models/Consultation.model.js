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
    state:{ //si está disponible o no para reservar true si
        type: Boolean,
        require: true,
    },
},{
    timestamps:true
})

const Consultation=mongoose.model('Consultation',ConsultationSchema)
module.exports=Consultation