const express = require('express');
const importbooksRouter = express.Router();
const authenticate = require('../authenticate');

importbooksRouter.route('/')
.all(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.post(authenticate.verifyUser,(req, res) => {
    res.end("This will save the information of all books passed in with a CSV file");
})
.get(authenticate.verifyUser,(req, res) => {
    res.end('GET operation not supported on /importbooks')
})
.put(authenticate.verifyUser,(req, res) => {
    res.end('PUT operation not supported on /importbooks')
})
.delete(authenticate.verifyUser,(req, res) => {
    res.end('DELETE operation not supported on /importbooks')
})

module.exports = importbooksRouter;