const mongoose=require('mongoose')
const { updateUserPatient } = require('./User.controller')

const Patient=mongoose.model('Patient')

const register= async (req,res)=>{
    const { _id } = req.params
    const{relationship, run, name,lastName, birthday, email,phone, street, number_st, department, city, region}=req.body
    const emailLowerCase=email.toLowerCase()
    
    try {
        const patient= new Patient({
            run, name,lastName, birthday, 
            address: {
                name_street:street, number_street:number_st, department, city, region
            }, 
            email:emailLowerCase,
            phone,
            sessions_id:[]
        })
        console.log(patient)
        const resp=await patient.save()
        console.log("resp: ", resp)
        const respUser = await updateUserPatient(_id, resp._id, relationship)
        if (respUser){
            return res.status(201).json({
                message: 'Patient created',
                patient
            })
        }else{
            console.log(error)
            return res.status(500).json({
                message: 'Server Error',
                code:500,
            detail: error,
            })
        }
    }catch(error){
        return res.status(500).json({
            message: 'Server Error',
            code:500,
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
            code:500,
            detail: error,
         })
    }
}
const updatePatient=async (req,res)=>{
    const{_id,patientUpdated}=req.body
    try {
        const resp=await Patient.findByIdAndUpdate(_id,patientUpdated, {new:true})
        return res.status(200).json({
            messege:"ok",
            detail:resp,
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            code:500,
            detail: error,
        })
    }
}

const getPatientById=async(req,res)=>{
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
            message:'Not found',
            code:404,
            detail: error,
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            code:500,
            detail: error,
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
            message:'Not found',
            code:404,
            detail: error,
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            code:500,
            detail: error,
        })
    }   
}

//call from other controller
const getPatientByIdd=async(_id)=>{
    try {
        const patient=await Patient.findOne({_id})
        if(patient){
            return patient     
        }
        return 
        
    } catch (error) {
        return 
    }   
}

const updatePatientt=async (patientUpdated)=>{
    try {
        const resp=await Patient.findByIdAndUpdate(patientUpdated._id,patientUpdated, {new:true})
        if(resp){            
            return resp
        }
        return 
    } catch (error) {
        return
    }
}
module.exports={
    register,
    getPatients,
    updatePatient,
    getPatientById,
    updatePatientById,
    getPatientByIdd,
    updatePatientt,
    
}