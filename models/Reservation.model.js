const mongoose=require('mongoose')

const ReservationSchema=new mongoose.Schema({
    id_patient:{
        type: String,
        required: true,
        validate: {
            validator:function(v){
                return /^[a-zA-Z0-9 ]{3,12}$/.test(v)
            },
        }
    },
    id_hours:{
        type: String,
        required: true,
        validate: {
            validator:function(v){
                return /^[a-zA-Z0-9 ]{3,12}$/.test(v)
            },
        }
    },
    price: {
        type:Number,
        required: true
    }
},{
    timestamps:true
})

const Reservation=mongoose.model('Reservation',ReservationSchema)
module.exports=Reservation