const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 5000;
const db = 'mongodb://heroku_598rhfhh:1ukc1g7soq5so1dk6uvr6i3tr8@ds151853.mlab.com:51853/heroku_598rhfhh';
const Schema = mongoose.Schema;

mongoose.connect(db, {useNewUrlParser: true});
app.use(bodyParser.urlencoded({ extended: true }));
    
var quote = new Schema({
    quote: String,
    auth: String
  });

var Quotes = mongoose.model('novatics-quotes', quote);

//Route
app.post('/', (req, res) => {
  console.log(req.body);
  Quotes.findById("5cb5ee91e7179a264cf184ca", function (err, myQuote) {
    console.log(myQuote);
    res.send('Quote: ' + myQuote.quote + '\nautor: ' + myQuote.auth);
});
  
})
//Start server
app.listen(port, (req, res) => {
console.log(`server listening on port: ${port}`)
 });

app.get('/', (req, res) => {
    Quotes.findById("5cb5ee91e7179a264cf184ca", function (err, adventure) {
        console.log(adventure);
        res.send(adventure);
    });
    
    
})