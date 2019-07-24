const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    comment:{
        type: String,
        required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogs',
        required: true
    }
})
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;