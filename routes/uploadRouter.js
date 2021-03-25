const express = require('express');
const authenticate = require('../authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/csv');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const csvFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(csv)$/)) {
        return cb(new Error('You can upload only CSV files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: csvFileFilter});

const uploadRouter = express.Router();

uploadRouter.route('/')
.get(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /csvUpload');
})
.post(authenticate.verifyUser, upload.single('csvFile'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /csvUpload');
})
.delete(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /csvUpload');
});

module.exports = uploadRouter;