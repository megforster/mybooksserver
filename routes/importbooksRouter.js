const express = require('express');
const importbooksRouter = express.Router();

importbooksRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.post((req, res) => {
    res.end("This will save the information of all books passed in with a CSV file");
})
.get((req, res) => {
    res.end('GET operation not supported on /importbooks')
})
.put((req, res) => {
    res.end('PUT operation not supported on /importbooks')
})
.delete((req, res) => {
    res.end('DELETE operation not supported on /importbooks')
})

module.exports = importbooksRouter;