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
    author:{
        type:String,
        required:true
    },
    timestamps:{
        type:String
    } ,

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
})
// userSchema.virtual('commint', {
//     ref: 'Commint',
//     localField: '_id',
//     foreignField: 'owner'
// });

// userSchema.virtual('User', {
//   ref: 'User',
//   localField: '_id',
//   foreignField: 'owner'
// });
const blogs = mongoose.model('Blogs', blogsSchema)

module.exports = blogs;