const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const user = new mongoose.Schema(
        {
            _id:{
                alias: "username",
                type: String,
                lowercase: true
            },
            password:{
                type:String,
                required: true
            },
            email:{
                type: String,
                required: true,
                unique:true,
                validate: {
                    validator: email => !Joi.string().email().validate(email)
                    .error,
                    msg:'Invalid email format'
                    }
                },
                
                About:{
                    type:String,
                    default: "this is a bit about me.",
                    required:false
                },
           
            __v:{
                type:Number,
                select:false
            }
        }, 

        {
            timestamps: true
        }
       

);

//self-defined function 
user.methods.hashPassword = async function(){
    this.password = await bcrypt.hash(this.password, 10);
}
user.methods.validatePassword = async function(password){
    const validatePassword = await bcrypt.compare(password, this.password);
    return validatePassword;
}

const model = mongoose.model('User', user);

module.exports = model;