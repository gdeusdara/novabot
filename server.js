const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env = require('dotenv');
const app = express();

env.config();

const port = process.env.PORT || 5000;
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
app.use(bodyParser.urlencoded({ extended: true }));
    
var quote = new Schema({
    quote: String,
    auth: String
  });

var Quotes = mongoose.model('novatics-quotes', quote);



//Route
app.post('/', (req, res) => {
    console.log(req.body);
    if (req.body.text === '') {
        
        res.send('Você não mandou nenhum quote! ):');
        
    } else if (req.body.text.includes(' by: ')) {
        
        var newQuote = req.body.text.split(" by: ");
        
        console.log(newQuote);
        
        var item = {  
            quote: newQuote[0],  
            auth: newQuote[1],  
        };  
        var data = new Quotes(item);  
        data.save();
        
    } else {
        var item = {  
            quote: req.body.text,  
            auth: 'sem autor',  
        };
        var data = new Quotes(item);  
        data.save();
        
    }
    
    res.send('Your new Quote: ' + item.quote + '\nautor: ' + item.auth);
    
})
//Start server
app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`)
    console.log(process.env.SLACK_TOKEN);
});

app.get('/', (req, res) => {
    Quotes.findById("5cb5ee91e7179a264cf184ca", function (err, adventure) {
        console.log(adventure);
        res.send(adventure);
    });
    
    
})
// Quotes.findById("5cb5ee91e7179a264cf184ca", function (err, myQuote) {
    //     console.log(myQuote);
        //     res.send('Quote: ' + myQuote.quote + '\nautor: ' + myQuote.auth);
        // });