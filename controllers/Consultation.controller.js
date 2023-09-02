const mongoose=require('mongoose')
const Consultation=mongoose.model('Consultation')

const register= async (req,res)=>{
    const{name,duration, price, description}=req.body
    try {
        const consultation= new Consultation({
            name,duration, price, description,
            state:true
        })
        const resp=await consultation.save()
        return res.status(201).json({
            message: 'Consultation created',
            consultation
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            code:500,
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
            code:500,
            detail: error,
         })
    }
}
const updateConsultation=async (req,res)=>{
    const {_id,consultationUpdated}=req.body
    try {
        const resp=await Consultation.findByIdAndUpdate(_id,consultationUpdated, {new:true})
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
const updateConsultationById=async(req,res)=>{
    const {_id}=req.params
    const {consultationUpdated}=req.body
    try {
        const resp=await Consultation.findByIdAndUpdate(_id,consultationUpdated, {new:true})
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

const getConsultationByIdd=async(_id)=>{
    try {
        const consultation=await Consultation.findOne({_id})
        console.log("obj consulta encontrado: ", consultation)
        if(consultation){
            return consultation
        }
        return null
    } catch (error) {
        return error
    }   
}

module.exports={
    register,
    getConsultation,
    updateConsultation,
    getConsultationById,
    updateConsultationById,
    getConsultationByIdd,
}