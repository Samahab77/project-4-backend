const mongoose = require('mongoose')
const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    text: {
        type: String ,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
})

const blogs = mongoose.model('Blogs', blogsSchema)

module.exports = blogs;