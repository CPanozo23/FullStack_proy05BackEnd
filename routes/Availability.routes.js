const express=require('express')

const router= express.Router()

const{ getAvailabilities, updateAvailability, getAvailabilityById, updateAvailabilityById}=require('../controllers/Availability.controller')
const auth = require('../middlewares/auth')

router.get('/', getAvailabilities)

router.put('/update',updateAvailability)

router.get('/:_id',auth,getAvailabilityById)

module.exports=router;