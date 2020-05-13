const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

const video = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true,
            validate:{
                validator: url => !Joi.string().pattern(urlRegex).validate(url).error, msg:"invalid url."
            }

        },
        like:{
            type:Number,
            default:0
        },
        author:{
            type:String,
            required:true
        },
        description:{
            type:String,
            default:"This is a description for the video."
        },
        keywords:{
            type:Array
        },
        playlist:{
            type: Array
        },
        _v:{
            type:Number,
            select:false
        }
    }, {
        timestamps:true
    }

)

const model = mongoose.model('Video', video);

module.exports = model;