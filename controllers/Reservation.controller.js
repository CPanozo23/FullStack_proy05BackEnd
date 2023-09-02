const mongoose=require('mongoose')
const {getPatientByIdd, updatePatientt} = require('./Patient.controller')
const {getHourByIdd, updateHourByIdd} = require('./Hour.controller')
const {getConsultationByIdd} = require('./Consultation.controller')

const Reservation=mongoose.model('Reservation')

const register= async (req,res)=>{
    const {id_patient, id_hour,id_consultation}=req.body
    try {
        const patient = await getPatientByIdd(id_patient)
        console.log("paso1")
        const consultation=await getConsultationByIdd(id_consultation)
        console.log("paso2")
        
        const hour=await updateHourByIdd(id_hour)
        console.log("paso3")
        
        if(typeof(patient) !== "undefined" && typeof(consultation) !== "undefined"){
            const id_patient=patient._id
            const price=consultation.price
            console.log("paso4")

                const reservation= new Reservation({
                    id_patient, hour,price
                })
                const resp=await reservation.save()
            console.log("paso5")

                patient.sessions_id.push(resp._id)
                const patientUpdate = await updatePatientt(patient)
            console.log("paso6")

                if(typeof(patientUpdate) === 'object'){
                    return res.status(201).json({
                        message: 'Reservation created',
                        reservation,
                    })

                }
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            code:500,
            detail: error,
        })
    }
}
const getReservations= async(req,res)=>{
    try {
        const resp=await Reservation.find()
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

const getReservationByIdUser= async(req,res)=>{
    const _idPatient = req.params._id

    try {
        const resp=await Reservation.find({ id_patient: _idPatient })
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
const updateReservation=async (req,res)=>{
    const{_id,reservationUpdated}=req.body
    console.log(_id,reservationUpdated)
    try {
        const resp=await Reservation.findByIdAndUpdate(_id,reservationUpdated, {new:true})
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

const getReservationById=async(req,res)=>{
    const{_id}=req.params
    try {
        const reservation=await Reservation.findOne({_id})
        if(reservation){
            return res.status(200).json({
                message:'ok',
                detail:reservation
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

const updateReservationById=async(req,res)=>{
    const{_id,reservationUpdated}=req.params
    try {
        const resp=await Reservation.findByIdAndUpdate(_id,reservationUpdated, {new:true})
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
module.exports={
    register,
    getReservations,
    updateReservation,
    getReservationById,
    updateReservationById,
    getReservationByIdUser
}