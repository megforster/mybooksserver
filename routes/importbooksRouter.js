const express = require('express');
const importbooksRouter = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');

importbooksRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.post(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    res.end("This will save the information of all books passed in with a CSV file");
})
.get(cors.cors, authenticate.verifyUser,(req, res) => {
    res.end('GET operation not supported on /importbooks')
})
.put(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    res.end('PUT operation not supported on /importbooks')
})
.delete(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    res.end('DELETE operation not supported on /importbooks')
})

module.exports = importbooksRouter;