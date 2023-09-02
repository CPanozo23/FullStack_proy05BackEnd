const express=require('express')

const router= express.Router()

const{ register, getReservations, updateReservation, getReservationById, updateReservationById, getReservationByIdUser}=require('../controllers/Reservation.controller')
const auth = require('../middlewares/auth')

router.get('/:_id', auth, getReservationByIdUser)

router.get('/view/:_id',auth,getReservationById)
router.post('/register',auth, register)
router.get('/',auth,getReservations)
router.put('/update',auth,updateReservation)
router.delete('/:_id',auth,updateReservationById)

module.exports=router