const mongoose=require('mongoose')
//const generateToken = require('../helpers/generateToken')
//const hashPassword = require('../helpers/hashPassword')

const Patient=mongoose.model('Patient')

const register= async (req,res)=>{
    const{run, name,lastName, birthday, address, email,phone}=req.body
    const emailLowerCase=email.toLowerCase()
    
    try {
        console.log(req.body)
        const patient= new Patient({
            run, name,lastName, birthday, address, 
            email:emailLowerCase,
            phone,
            sessions_id:[]
        })
        console.log("Patient creado ", patient)
        const resp=await patient.save()
        console.log("resp: ", resp)
        //const token=generateToken(resp)
        //console.log(token)
        return res.status(201).json({
            message: 'Patient created',
            patient
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            detail: error,
        })
    }
}

const getPatients= async(req,res)=>{
    try {
        const resp=await Patient.find()
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
const updatePatient=async (req,res)=>{
    const{_id,patientUpdated}=req.body
    console.log(_id,patientUpdated)
    try {
        const resp=await Patient.findByIdAndUpdate(_id,patientUpdated, {new:true})
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

const getPatientById=async(req,res)=>{
    console.log(req)
    const {_id}=req.params
    try {
        const patient=await Patient.findOne({_id})
        if(patient){
            return res.status(200).json({
                message:'ok',
                detail:patient
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
/*
const deleteUserById=async(req,res)=>{
    const{_id}=req.params
    try {
        const resp=await User.findByIdAndDelete(_id)
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
}*/
const updatePatientById=async(req,res)=>{
    const{_id,patientUpdated}=req.params
    try {
        const resp=await Patient.findByIdAndUpdate(_id,patientUpdated, {new:true})
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



const getPatientByIdd=async(_id)=>{
    console.log(_id)
    //const {_id}=req.params
    try {
        const patient=await Patient.findOne({_id})
        if(patient){
            return patient
            
        }else{
            console.log('Not found patient')
        }
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            error
        })
    }   
}

module.exports={
    register,
    getPatients,
    updatePatient,
    getPatientById,
    updatePatientById,
    getPatientByIdd
}