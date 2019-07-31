const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String
    },
    text: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
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
const book = mongoose.model('Book', bookSchema)

module.exports = book;