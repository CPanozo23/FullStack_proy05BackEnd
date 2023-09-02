const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    run:{
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: (value) => /^[a-zA-Z0-9]{9}$/.test(value),
        },
    },
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[^\s]{3,30}$/.test(v)
        },
      },
    },
    lastName:{
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^[a-zA-Z0-9 ]{3,30}$/.test(v)
          },
        }
    },
    birthday:{
        type: Date,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
        index: true,
        validate: {
            validator:function(v){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
            },
        }
    },
    password:{
        type: String,
        require: true,
    },
    type:{
        type: Number,
        required: true,
    },
    patients: {
        type: [
          {
            _id: {
              type: String,
              required: true,
              validate: {
                validator: function (v) {
                  return /^[a-zA-Z0-9 ]{3,12}$/.test(v)
                },
              },
            },
            relationship: {
              type: String,
              required: true,
              validate: {
                validator: function (v) {
                  return /^[^\s]{3,30}$/.test(v)
                },
              },
            },
          },
        ],
        default: [], // Inicializar como un arreglo vacío
      } 
},{
    timestamps:true
})

const User=mongoose.model('User',UserSchema)
module.exports=User