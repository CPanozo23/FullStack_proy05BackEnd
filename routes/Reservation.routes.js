const express=require('express')

const router= express.Router()

const{ register, getReservations, updateReservation, getReservationById, updateReservationById}=require('../controllers/Reservation.controller')
const auth = require('../middlewares/auth')

router.post('/register',auth, register) //FALTA COMPROBAR
router.get('/',auth,getReservations)
router.put('/update',auth,updateReservation) //FALTA COMPROBAR
router.post('/:_id',auth,getReservationById) //FALTA COMPROBAR
router.delete('/:_id',auth,updateReservationById) //FALTA COMPROBAR

module.exports=router;