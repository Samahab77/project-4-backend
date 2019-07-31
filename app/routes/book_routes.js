// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// pull in Mongoose model for blogs
const Book = require('../models/Book')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })


// instantiate a router (mini app that only handles routes)
const router = express.Router()
//index
// git blogs for current user  
router.get('/books', requireToken, (req, res, next) => {
    Book.find({ owner: req.user.id })
        .then(books => res.status(200).json({ books: books }))
        .catch(next)

})
//index for any user 

router.get('/books/all', (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json({ books: books }))
        .catch(next)

})

// show 
router.get('/books/:id', requireToken, (req, res, next) => {
    Book.findById(req.params.id)
        .then(handle404)
        .then(book => {
            requireOwnership(req, book)
            res.status(200).json({ book: book.toObject() })
                .catch(next)

        })
})
// // show 
// router.get('/blogs/all/:id', (req, res, next) => {
//     Blogs.findById(req.params.id)
//         .then(handle404)
//         .then(blog => {
//             // requireOwnership(req, blog)
//             res.status(200).json({ blog: blog.toObject() })
//                 .catch(next)

//         })
// })

//create 

router.post('/books', requireToken, (req, res, next) => {
    req.body.book.owner = req.user.id
    // req.body.book.author = req.user.email
    Book.create(req.body.book)
        .then(book => {
            res.status(201).json({ book: book.toObject() })
        })
        .catch(next)
})

//destroy
router.delete('/books/:id', requireToken, (req, res, next) => {
    Book.findById(req.params.id)
        .then(handle404)
        .then(book => {
            requireOwnership(req, book)
            book.remove()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

//update

router.put('/books/:id', requireToken, (req, res, next) => {
    delete req.body.book.owner
    Book.findById(req.params.id)
        .then(handle404)
        .then(book => {
            requireOwnership(req, book)
            return book.update(req.body.book)

        })

        .then(() => res.sendStatus(204))
        .catch(next)

})




module.exports = router
