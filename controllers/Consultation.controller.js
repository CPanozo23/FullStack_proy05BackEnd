const mongoose=require('mongoose')
//const generateToken = require('../helpers/generateToken')
//const hashPassword = require('../helpers/hashPassword')

const Consultation=mongoose.model('Consultation')

const register= async (req,res)=>{
    const{name,duration, price}=req.body
    try {
        console.log(req.body)
        const consultation= new Consultation({
            name,duration, price,
            state:true
        })
        console.log("Consultation creado ", consultation)
        const resp=await consultation.save()
        console.log("resp: ", resp)
        //const token=generateToken(resp)
        //console.log(token)
        return res.status(201).json({
            message: 'Consultation created',
            consultation
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            detail: error,
        })
    }
}

const getConsultation= async(req,res)=>{
    try {
        const resp=await Consultation.find()
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
const updateConsultation=async (req,res)=>{
    console.log(req)
    const {_id,consultationUpdated}=req.body
    console.log(_id,consultationUpdated)
    try {
        const resp=await Consultation.findByIdAndUpdate(_id,consultationUpdated, {new:true})
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
/*
const deleteUser=async (req,res)=>{
    const{_id}=req.body
    console.log(_id)
    try {
        const resp=await User.findByIdAndDelete(_id)
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
*/


const getConsultationById=async(req,res)=>{
    const{_id}=req.params
    try {
        const consultation=await Consultation.findOne({_id})
        if(consultation){
            return res.status(200).json({
                message:'ok',
                detail:consultation
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
const updateConsultationById=async(req,res)=>{
    console.log(req)
    const {_id}=req.params
    const {consultationUpdated}=req.body
    console.log("datos")
    console.log(_id)
    console.log(consultationUpdated)
    try {
        const resp=await Consultation.findByIdAndUpdate(_id,consultationUpdated, {new:true})
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
    getConsultation,
    updateConsultation,
    getConsultationById,
    updateConsultationById,
}