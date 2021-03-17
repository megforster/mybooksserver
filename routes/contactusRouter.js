// const express = require('express');
// const bookRouter = express.Router();

// bookRouter.route('/')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
// .post((req, res) => {
//     res.end("This will save user feedback");
// })
// .get((req, res) => {
//     res.end('GET operation not supported on /contactus')
// })
// .put((req, res) => {
//     res.end('PUT operation not supported on /contactus')
// })
// .delete((req, res) => {
//     res.end('DELETE operation not supported on /contactus')
// })

// module.exports = bookRouter;

const express = require('express');
const Feedback = require('../models/feedback');

const feedbackRouter = express.Router();

feedbackRouter.route('/')
.get((req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /contactus');
})
.post((req, res, next) => {
    Feedback.create(req.body)
    .then(feedback=> {
        console.log('Feedback Submitted ', feedback);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /contactus');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /contactus');
});

module.exports = feedbackRouter