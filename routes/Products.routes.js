const express=require('express')

const router= express.Router()

const{ product_up, getProducts, updateProduct, deleteProduct, getProductById, deleteProductById, updateProductById}=require('../controllers/Products.controller')
const auth = require('../middlewares/auth')

router.get('/', getProducts)

router.post('/create',auth,product_up) //Registro

router.put('/update',auth,updateProduct)

router.delete('/delete',auth,deleteProduct)


router.get('/:_id',auth,getProductById)

router.delete('/:_id',auth,deleteProductById)

router.put('/:_id',auth,updateProductById)

module.exports=router;