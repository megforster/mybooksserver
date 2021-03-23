const express = require('express');
const Feedback = require('../models/feedback');
const authenticate = require('../authenticate');

const feedbackRouter = express.Router();

feedbackRouter.route('/')
.get(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /contactus');
})
.post(authenticate.verifyUser,(req, res, next) => {
    Feedback.create(req.body)
    .then(feedback=> {
        console.log('Feedback Submitted ', feedback);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /contactus');
})
.delete(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /contactus');
});

module.exports = feedbackRouter