const express=require('express')

const router= express.Router()

const auth = require('../middlewares/auth')
const{ signup, getUsers, updateUserPatient, login, getUserById, updateUser, getPatientsByUserId}=require('../controllers/User.controller')
router.get('/:_id/patients',auth,getPatientsByUserId)

router.post('/signup',signup)
router.get('/', getUsers)
router.put('/update',updateUser)
router.post('/login',login)
//router.delete('/',deleteUser)
router.post('/:_id',auth,updateUserPatient)
router.get('/:_id',auth,getUserById)
router.put('/:_id',auth,updateUser)
//router.put('/email',auth,getUserByEmail) //NO
//router.delete('/:_id',auth,deleteUserById)

module.exports=router;