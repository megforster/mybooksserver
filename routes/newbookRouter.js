const express = require('express');
const Book = require('../models/book');
const authenticate = require('../authenticate');
const cors = require('./cors');

const newbookRouter = express.Router();

newbookRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /newbook');
})
.post(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
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
.put(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /newbook');
})
.delete(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /newbook');
});

module.exports = newbookRouter;