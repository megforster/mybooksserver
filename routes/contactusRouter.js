const express = require('express');
const Feedback = require('../models/feedback');
const authenticate = require('../authenticate');
const cors = require('./cors');

const feedbackRouter = express.Router();

feedbackRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /contactus');
})
.post(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
    Feedback.create(req.body)
    .then(feedback=> {
        console.log('Feedback Submitted ', feedback);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /contactus');
})
.delete(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /contactus');
});

module.exports = feedbackRouter