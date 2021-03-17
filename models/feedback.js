const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    firstname:{
        type: String,
        required: true
    }, 
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String
    },
    feedback:{
        type: String,
        required: true
    }
})

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;