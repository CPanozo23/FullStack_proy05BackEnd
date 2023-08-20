const express=require('express')

const router= express.Router()

const{ register, getConsultation, updateConsultation, getConsultationById, updateConsultationById}=require('../controllers/Consultation.controller')
const auth = require('../middlewares/auth')

router.post('/register',auth, register) 
router.get('/', getConsultation)
router.put('/update',auth,updateConsultation) //FALTA COMPROBAR
router.get('/:_id',getConsultationById)
router.post('/:_id',auth,updateConsultationById)

module.exports=router;