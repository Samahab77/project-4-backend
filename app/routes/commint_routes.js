const express = require('express')
const passport = require('passport')
//comment
const Comment = require('../models/comment')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.get('/blogs/:blogs_id/comments', requireToken, (req, res, next) => {
    Comment.find({ blog: req.params.blogs_id })
        .then(comments => res.status(200).json({ comments: comments }))
        .catch(next)
})

//CREATE comments
//  -POST  /blogs/:blogs_id/comments
router.post('/blogs/:blogs_id/comments',requireToken,(req,res,next) => {
    const userId = req.user.id
    const blogId = req.params.blogs_id
    const newComment = req.body.comment
    console.log(req.body)
    newComment.blog = blogId
    newComment.owner = userId

    Comment.create(newComment)
    .then((comment) => {
        res.status(201).json({comment: comment})
    })
    .catch(next)
})

//show 
router.get('/blogs/:blogs_id/comments/:id',requireToken,(req ,res,nex) => {
    Comment.findById(req.params.id)
        .then(handle404)
        .then(comment => {
            requireOwnership(req, comment)
            res.status(200).json({ comment: comment.toObject() })
                
            .catch(next)

        })
})

// Edit comment 
// put

router.put('/blogs/:blogs_id/comments/:id',requireToken,(req, res, next) => {
    // delete req.body.comment.owner
    // delete req.body.blog.owner

    Comment.findById(req.params.id)
    .then(handle404)
    .then( comment => {
        requireOwnership(req, comment)
        return comment.update(req.body.comment)  
    })
     .then(() => res.sendStatus(204))
     .catch(next) 
       
})
router.delete('/blogs/:blogs_id/comments/:id', requireToken, (req, res, next) => {
    Comment.findById(req.params.id)
        .then(handle404)
        .then(comment => {
            requireOwnership(req, comment)
            comment.remove()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})
 


module.exports = router 