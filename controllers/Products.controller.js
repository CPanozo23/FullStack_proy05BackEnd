const mongoose=require('mongoose')
const generateToken = require('../helpers/generateToken')
const hashPassword = require('../helpers/hashPassword')

const Product=mongoose.model('Product')

//CREAR PRODUCTO
const product_up= async (req,res)=>{
    const{name, author, category, description, price, discount, imagen, quantity}=req.body
    
    try {
        const product= new Product({
            name, author, category, description, price, discount, imagen, quantity, sold:0
        })
        const resp=await product.save()
        const token=generateToken(resp)
        return res.status(201).json({
            message: 'Product created',
            token

        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            detail: error,
        })
    }
}

const getProducts= async(req,res)=>{
    try {
        const resp=await Product.find()
        return res.status(200).json({
            message:'OK',
            detail:resp,
        })
    } catch (error) {
         return res.status(500).json({
            message: 'Internal Server Error',
            detail: error,
         })
    }
}
const updateProduct=async (req,res)=>{
    const{_id,productUpdated}=req.body
    console.log(_id,productUpdated)
    try {
        const resp=await Product.findByIdAndUpdate(_id,productUpdated, {new:true})
        return res.status(200).json({
            messege:"ok",
            detail:resp,
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            detail:error,
        })
    }
}
const deleteProduct=async (req,res)=>{
    const{_id}=req.body
    console.log(_id)
    try {
        const resp=await Product.findByIdAndDelete(_id)
        return res.status(200).json({
            messege:"ok",
            detail:resp,
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            detail:error,
        })
    }
}

const getProductById=async(req,res)=>{
    const{_id}=req.params
    try {
        const product=await Product.findOne({_id})
        if(product){
            return res.status(200).json({
                message:'ok',
                detail:product
            })
        }
        return res.status(404).json({
            message:'Not found'
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            error
        })
    }   
}
const deleteProductById=async(req,res)=>{
    const{_id}=req.params
    try {
        const resp=await Product.findByIdAndDelete(_id)
        if(resp){            
            return res.status(200).json({
            messege:"ok",
            detail:resp,
        })
        }
        return res.status(404).json({
            message:'Not found'
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            error
        })
    }   
}
const updateProductById=async(req,res)=>{
    const{_id,productUpdated}=req.params
    try {
        const resp=await Product.findByIdAndUpdate(_id,productUpdated, {new:true})
        if(resp){            
            return res.status(200).json({
            messege:"ok",
            detail:resp,
        })
        }
        return res.status(404).json({
            message:'Not found'
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            error
        })
    }   
}

module.exports={
    product_up,
    getProducts,
    updateProduct,
    deleteProduct,
    getProductById,
    deleteProductById,
    updateProductById
}