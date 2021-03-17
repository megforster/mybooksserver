// const express = require('express');
// const bookRouter = express.Router();

// bookRouter.route('/:bookId')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
// .get((req, res) => {
//     res.end(`This will return book: ${req.params.bookId}'s information`);
// })
// .post((req, res) => {
//     res.end(`This will update book: ${req.params.bookId}'s information`);
// })
// .delete((req, res) => {
//     res.end(`This will delete book: ${req.params.bookId}`);
// });

// module.exports = bookRouter;

const express = require('express');
const Book = require('../models/book');

const bookRouter = express.Router();

bookRouter.route('/:bookId')
.get((req, res, next) => {
    Book.findById(req.params.bookId)
    .then(book => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    })
    .catch(err => next(err));
})
.post((req, res)=>{
    res.statusCode = 403;
    res.end(`POST operation not supported on /books/${req.params.bookId}`);
})
.put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.bookId, {
        $set: req.body
    }, { new: true })
    .then(book => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Book.findByIdAndDelete(req.params.bookId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = bookRouter;