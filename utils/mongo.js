const mongoose = require('mongoose');
const env = require('dotenv');

env.config();

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


var quote = new Schema({
    quote: String,
    auth: String
});

var Quotes = mongoose.model('novatics-quotes', quote);

module.exports = Quotes;