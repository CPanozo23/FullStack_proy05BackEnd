const mongoose=require('mongoose')

const AvailabilitySchema=new mongoose.Schema({
    
    date_start:{
        type: Date,
        require: true,
    },
    date_end:{
        type: Date,
        require: true,
    },
    state:{
        type: Boolean,
        require: true,
    },

},{
    timestamps:true
})

const Availability=mongoose.model('Availability',AvailabilitySchema)


module.exports=Availability