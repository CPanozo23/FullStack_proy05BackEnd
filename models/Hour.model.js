const mongoose=require('mongoose')

const HourSchema=new mongoose.Schema({
    startTime: {
        type: Date,
        require: true,
        unique:true
    },
    duration:{
        type: Number,
        require: true,
    },
    state:{
        type: Boolean,
        require: true,
    },
},{
    timestamps:true
})

const Hour=mongoose.model('Hour',HourSchema)
module.exports=Hour