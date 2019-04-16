const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const env = require('dotenv');
const app = express();
const { WebClient, ErrorCode } = require('@slack/web-api');

env.config();

const port = process.env.PORT || 5000;
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var quote = new Schema({
    quote: String,
    auth: String
});

var Quotes = mongoose.model('novatics-quotes', quote);

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
})

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


app.get('/get-quotes', async (req, res) => {
    Quotes.find()  
    .then(function(quotes) {  
        res.json(quotes);  
    });
});


//Start server
app.listen(port, (req, res) => {    
    console.log(`server listening on port: ${port}`)
    console.log(process.env.SLACK_TOKEN);
});