const express = require('express');
const Book = require('../models/book');
const authenticate = require('../authenticate');
const cors = require('./cors');

const bookRouter = express.Router();

bookRouter.route('/:bookId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser,(req, res, next) => {
    Book.findById(req.params.bookId)
    .then(book => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,(req, res)=>{
    res.statusCode = 403;
    res.end(`POST operation not supported on /books/${req.params.bookId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
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
.delete(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
    Book.findByIdAndDelete(req.params.bookId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = bookRouter;