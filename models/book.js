const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true
    }, 
    author:{
        type: String,
        required: true,
    }, 
    rating:{
        type: Number,
        required: true
    }, 
    review:{
        type: String
    }, 
    reviewer:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
},{
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;