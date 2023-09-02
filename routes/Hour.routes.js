const express=require('express')

const router= express.Router()

const{ register, getHours, updateHour, deleteHour, getHourById, deleteHourById, updateHourById, getHoursTrue, updateHourByIddReq}=require('../controllers/Hour.controller')
const auth = require('../middlewares/auth')

router.get('/', getHours)
router.get('/available', getHoursTrue)
router.get('/:_id',getHourById) 
router.post('/register',auth, register)
//router.put('/update',auth,updateHour)
router.put('/update',auth,updateHourByIddReq)
router.post('/:_id',auth,updateHourById) 
router.delete('/:_id',auth,deleteHourById)

module.exports=router