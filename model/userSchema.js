const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    list:[
        {
            type:mongoose.Types.ObjectId,
            ref:"todoList"
        }
    ]
})

const user = mongoose.model('user',userShema);

module.exports = user;