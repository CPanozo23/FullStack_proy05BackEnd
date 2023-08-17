const mongoose=require('mongoose')
const generateToken = require('../helpers/generateToken')
const hashPassword = require('../helpers/hashPassword')

const Availability=mongoose.model('Availability')

const getAvailabilities= async(req,res)=>{
    try {
        const resp=await Availability.find()
        return res.status(200).json({
            message:'OK',
            detail:resp,
        })
    } catch (error) {
         return res.status(500).json({
            message: 'Internal Server Error',
            detail: error,
         })
    }
}
const updateAvailability=async (req,res)=>{
    const{_id,availabilityUpdated}=req.body
    console.log(_id,availabilityUpdated)
    try {
        const resp=await Availability.findByIdAndUpdate(_id,availabilityUpdated, {new:true})
        return res.status(200).json({
            messege:"ok",
            detail:resp,
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            detail:error,
        })
    }
}

const getAvailabilityById=async(req,res)=>{
    const{_id}=req.params
    try {
        const availability=await Availability.findOne({_id})
        if(availability){
            return res.status(200).json({
                message:'ok',
                detail:availability
            })
        }
        return res.status(404).json({
            message:'Not found'
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            error
        })
    }   
}

const updateAvailabilityById=async(req,res)=>{
    const{_id,availabilityUpdated}=req.params
    try {
        const resp=await Availability.findByIdAndUpdate(_id,availabilityUpdated, {new:true})
        if(resp){            
            return res.status(200).json({
            messege:"ok",
            detail:resp,
        })
        }
        return res.status(404).json({
            message:'Not found'
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            error
        })
    }   
}

module.exports={
    getAvailabilities,
    updateAvailability,
    getAvailabilityById,
    updateAvailabilityById
}