const mongoose=require('mongoose')
const getPatientByIdd = require('./Patient.controller')
const getHourById = require('./Hour.controller')
const getConsultationById = require('./Consultation.controller')
//const generateToken = require('../helpers/generateToken')
//const hashPassword = require('../helpers/hashPassword')

const Reservation=mongoose.model('Reservation')

const register= async (req,res)=>{
    const {id_patient, id_hour,id_consultation}=req.body
    try {
        console.log(req.body)
        console.log("Buscar patient")
        const patient = await getPatientByIdd(id_patient)
        console.log("imprimiendo paciente: ", patient)
        const hour=await getHourById(id_hour)
        const consultation=await getConsultationById(id_consultation)
        if(patient && hour && consultation){
            console.log("Datos a guardar:")
            console.log(patient._id + " " + hour._id  + " " + consultation._id)
            /*const reservation= new Reservation({
                id_patient, id_hour,id_consultation
            })
            console.log("Reservation creado ", reservation)
            const resp=await reservation.save()
            console.log("resp: ", resp)
            return res.status(201).json({
                message: 'Reservation created',
                reservation,
            })*/
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            detail: error,
        })
    }
}
//Filtrar: fechas futuras, por usuario
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
            detail:error,
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
            message:'Not found'
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            error
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
    getReservations,
    updateReservation,
    getReservationById,
    updateReservationById,
}