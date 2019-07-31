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
  token: String,
  admin:{
    type:Boolean,
    required:true,
    default:false
  }
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    },
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})
userSchema.virtual('commints', {
  ref: 'Commint',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.virtual('blogs', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'owner'
});

  userSchema.virtual('book', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'owner'
  })

module.exports = mongoose.model('User', userSchema)
