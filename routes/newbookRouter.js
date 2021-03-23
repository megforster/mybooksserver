const express = require('express');
const Book = require('../models/book');
const authenticate = require('../authenticate');

const newbookRouter = express.Router();

newbookRouter.route('/')
.get(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /newbook');
})
.post(authenticate.verifyUser,(req, res, next) => {
    req.body.reviewer = req.user._id
    Book.create(req.body)
    .then(book => {
        console.log('Book Added ', book);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /newbook');
})
.delete(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /newbook');
});

module.exports = newbookRouter;