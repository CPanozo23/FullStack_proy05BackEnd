const express=require('express')

const router= express.Router()

const{ register, getConsultation, updateConsultation, getConsultationById, updateConsultationById}=require('../controllers/Consultation.controller')
const auth = require('../middlewares/auth')

router.get('/', getConsultation)
router.post('/register',auth, register) 
router.put('/update',auth,updateConsultation)
router.get('/:_id',getConsultationById)
router.post('/:_id',auth,updateConsultationById)

module.exports=router