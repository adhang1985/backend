const mongoose = require('mongoose');

const listShema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    user:[
        {
            type:mongoose.Types.ObjectId,
            ref:"user"
        }
    ]
},{timestamps:true})

const list = mongoose.model('todoList',listShema);

module.exports = list;