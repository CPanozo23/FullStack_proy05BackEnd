const mongoose=require('mongoose')

const ReservationSchema=new mongoose.Schema({
    id_patient:{
        type: String,
        required: true,
    },
    id_hours:{
        type: String,
        required: true,
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