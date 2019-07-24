const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    // required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String,
    //  required: true,

  },
  phone_num:{
    type: Number,
  },
  hashedPassword: {
    type: String,
    required: true
  },
  token: String
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})
userSchema.virtual('commints', {
  ref: 'Commint',
  localField: '_id',
  foreignField: 'owner'
}),
// userSchema.virtual('blogs', {
//   ref: 'Blogs',
//   localField: '_id',
//   foreignField: 'owner'
// });

module.exports = mongoose.model('User', userSchema)
