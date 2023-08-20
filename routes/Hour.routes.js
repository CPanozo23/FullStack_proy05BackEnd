const express=require('express')

const router= express.Router()

const{ register, getHours, updateHour, deleteHour, getHourById, deleteHourById, updateHourById}=require('../controllers/Hour.controller')
const auth = require('../middlewares/auth')

router.post('/register',auth, register) //FALTA COMPROBAR
router.get('/', getHours)
router.put('/update',auth,updateHour) //FALTA COMPROBAR
router.get('/:_id',getHourById) 
router.post('/:_id',auth,updateHourById) 
router.delete('/:_id',auth,deleteHourById) //FALTA COMPROBAR

module.exports=router;