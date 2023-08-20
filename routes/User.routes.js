const express=require('express')

const router= express.Router()

//const{ signup, getUsers, updateUser, deleteUser, login, getUserById, deleteUserById, updateUserById}=require('../controllers/User.controller')
const{ signup, getUsers, updateUser, updateUserPatient, login, getUserById}=require('../controllers/User.controller')
const auth = require('../middlewares/auth')

router.post('/signup',signup) //Registro
router.get('/', getUsers)
router.put('/update',updateUser) //FALTA COMPROBAR
//router.delete('/',deleteUser)
router.post('/:_id',auth,updateUserPatient)
router.post('/login',login)
router.get('/:_id',auth,getUserById)
//router.delete('/:_id',auth,deleteUserById)

module.exports=router;