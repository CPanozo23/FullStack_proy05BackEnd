const mongoose=require('mongoose')
//const generateToken = require('../helpers/generateToken')
//const hashPassword = require('../helpers/hashPassword')

const Hour=mongoose.model('Hour')

//cambiar a que solo envíe horas disponibles state:true
//después agregar otro para el admin ver las futuras horas y el historial
const register= async (req,res)=>{
    const {startTime,duration}=req.body
    try {
        console.log(req.body)
        const hour= new Hour({
            startTime,duration,
            state:true
        })
        console.log("Hour creado ", hour)
        const resp=await hour.save()
        console.log("resp: ", resp)
        //const token=generateToken(resp)
        //console.log(token)
        return res.status(201).json({
            message: 'Hour created',
            hour
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            detail: error,
        })
    }
}
const getHours= async(req,res)=>{
    try {
        const resp=await Hour.find()
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
const updateHour=async (req,res)=>{
    const{_id,hourUpdated}=req.body
    console.log(_id,hourUpdated)
    try {
        const resp=await Hour.findByIdAndUpdate(_id,hourUpdated, {new:true})
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

//delete solo si está con estado true

const deleteHour=async (req,res)=>{
    const{_id}=req.body
    console.log(_id)
    try {
        const resp=await Hour.findByIdAndDelete(_id)
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

const getHourById=async(req,res)=>{
    const _id=req.params
    try {
        const hour=await Hour.findOne({_id})
        if(hour){
            return res.status(200).json({
                message:'ok',
                detail:hour
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
const deleteHourById=async(req,res)=>{
    const{_id}=req.params
    try {
        const resp=await Hour.findByIdAndDelete(_id)
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
const updateHourById=async(req,res)=>{
    const{_id}=req.params
    const{hourUpdated}=req.body
    console.log(_id)
    console.log(hourUpdated)
    try {
        const resp=await Hour.findByIdAndUpdate(_id,hourUpdated, {new:true})
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
    register,
    getHours,
    updateHour,
    deleteHour,
    getHourById,
    deleteHourById,
    updateHourById,
}