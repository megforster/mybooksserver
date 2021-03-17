// const express = require('express');
// const allbooksRouter = express.Router();

// allbooksRouter.route('/')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
// .get((req, res) => {
//     res.end("This will return every book");
// })
// .post((req, res) => {
//     res.end('POST operation not supported on /allbooks')
// })
// .put((req, res) => {
//     res.end('PUT operation not supported on /allbooks')
// })
// .delete((req, res) => {
//     res.end('DELETE operation not supported on /allbooks')
// })

// module.exports = allbooksRouter;

const express = require('express');
const Book = require('../models/book');

const allbooksRouter = express.Router();

allbooksRouter.route('/')
.get((req, res, next) => {
    Book.find()
    .then(book => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    })
    .catch(err => next(err));
})
.post((req, res)=>{
    res.statusCode = 403;
    res.end(`POST operation not supported on /allbooks`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /allbooks`);
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /allbooks`);
});

module.exports = allbooksRouter