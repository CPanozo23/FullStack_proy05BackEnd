const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        validate: {
            validator:function(v){
                return /^[a-zA-Z0-9 ]{3,30}$/.test(v)
            },
        }
    },

    author:{
        type: String,
        required: true,
        validate: {
            validator:function(v){
                return /^[a-zA-Z0-9 ]{3,30}$/.test(v)
            },
        }
    },
    
    category:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        require: true,
    },
    discount:{
        type: Number,
        require: true,
    },
    imagen:{
        type: String,
        required: true,
        
    },
    quantity:{
        type: Number,
        require: true,
    },
    sold:{
        type: Number,
        require: true,
    },
    description:{
        type: String,
        required: true,
    },
    
},{
    timestamps:true
})

const Product=mongoose.model('Product',ProductSchema)


module.exports=Product