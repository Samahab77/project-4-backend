// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// pull in Mongoose model for blogs
const Blogs = require('../models/Blogs')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })


// instantiate a router (mini app that only handles routes)
const router = express.Router()
//index
// git blogs 
router.get('/blogs', requireToken, (req, res, next) => {
    Blogs.find({ owner: req.user.id })
    .then(blogs => res.status(200).json({ blogs: blogs }))
    .catch(next)

})

// show 
router.get('/blogs/:id', requireToken, (req, res, next) => {
    Blogs.findById(req.params.id)
    .then(handle404)
    .then(blog => {
     requireOwnership(req, blog)
     res.status(200).json({ blog: blog.toObject() })
    .catch(next)

    })
})

//create 
router.post('/blogs', requireToken, (req, res, next) => {
    req.body.blog.owner = req.user.id
    Blogs.create(req.body.blog)
        .then(blog => {
            res.status(201).json({ blog: blog.toObject() })
        })
        .catch(next)
})

//destroy
router.delete('/blogs/:id', requireToken, (req, res, next) => {
    Blogs.findById(req.params.id)
    .then(handle404)
    .then(blog =>{
        requireOwnership(req, blog)
        blog.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
 })
 //update

router.put('/blogs/:d', requireToken, (req, res, next) => {
     delete req.body.blog.owner
     Blogs.findById(req.params.id)
    .then(handle404)
    .then(blog =>{
        requireOwnership(req, blog)
        return blog.update(req.body.blog)

    })
    
    .then(() => res.status(204))
    .catch(next)    

 })


module.exports = router
