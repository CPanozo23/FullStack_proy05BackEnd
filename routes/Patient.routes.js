const express=require('express')
const router= express.Router()
const{ register, getPatients, updatePatient, getPatientById, updatePatientById}=require('../controllers/Patient.controller')
const auth = require('../middlewares/auth')

router.post('/register/:_id', auth, register)
router.get('/', auth, getPatients)
router.put('/update',updatePatient) //FALTA COMPROBAR
//router.get('/:_id',auth,getPatientById)
//router.get('/:_id',auth, getPatientById)
//router.put('/:_id',auth,updatePatientById)
router.put('/:_id',updatePatientById)

module.exports=router