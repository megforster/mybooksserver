// const express = require('express');
// const newbookRouter = express.Router();

// newbookRouter.route('/')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
// .post((req, res) => {
//     res.end('A new book will be saved to the server');
// })
// .get((req, res) => {
//     res.end('GET operation not supported on /newbook')
// })
// .put((req, res) => {
//     res.end('PUT operation not supported on /newbook')
// })
// .delete((req, res) => {
//     res.end('DELETE operation not supported on /newbook')
// })

// module.exports = newbookRouter;

const express = require('express');
const Book = require('../models/book');

const newbookRouter = express.Router();

newbookRouter.route('/')
.get((req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /newbook');
})
.post((req, res, next) => {
    Book.create(req.body)
    .then(book => {
        console.log('Book Added ', book);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /newbook');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /newbook');
});

module.exports = newbookRouter;