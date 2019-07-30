const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
title:{
    type:String,
    required:true
},
cover:{
    type:String,
    required:true
}
},{
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    // ref:'Admin'??
    required: true
        }
    }, {
        timestamps: true
    })
const book = mongoose.model('Book', bookSchema)
module.exports = book;