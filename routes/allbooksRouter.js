const express = require('express');
const Book = require('../models/book');
const authenticate = require('../authenticate');
const cors = require('./cors');

const allbooksRouter = express.Router();

allbooksRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser,(req, res, next) => {
    Book.find({"reviewer":req.user._id})
    .populate('book.reviewer')
    .then(book => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,(req, res)=>{
    res.statusCode = 403;
    res.end(`POST operation not supported on /allbooks`);
})
.put(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /allbooks`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /allbooks`);
});

module.exports = allbooksRouter