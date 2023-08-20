const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    //validar como RUN
    run:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
        validate: {
            validator:function(v){
                return /^[a-zA-Z0-9 ]{3,30}$/.test(v)
            },
        }
    },
    lastName:{
        type: String,
        required: true,
        validate: {
            validator:function(v){
                return /^[a-zA-Z0-9 ]{3,30}$/.test(v)
            },
        }
    },
    birthday:{
        type: Date,
        require: true,
    },
})

const Person = mongoose.model('Person', PersonSchema)
module.exports = Person