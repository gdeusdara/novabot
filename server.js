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

var quote = new Schema({
    quote: String,
    auth: String
});

var Quotes = mongoose.model('novatics-quotes', quote);


// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
})


app.get('*', (req, res) => {
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
//Start server
app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`)
    console.log(process.env.SLACK_TOKEN);
});

app.get('/', async (req, res) => {
    // var response;
    // try {
    //     response = await web.users;
    // } catch (error) {
    //     // Check the code property, and when its a PlatformError, log the whole response.
    //     if (error.code === ErrorCode.PlatformError) {
    //         console.log(error.data);
    //     } else {
    //         // Some other error, oh no!
    //         console.log('Well, that was unexpected.' + error);
    //     }
    // }
    // if (response) {

    //     console.log('Message sent: ', response.identity);
    // }
    // res.send('teste' + response.info);
})
// Quotes.findById("5cb5ee91e7179a264cf184ca", function (err, myQuote) {
    //     console.log(myQuote);
        //     res.send('Quote: ' + myQuote.quote + '\nautor: ' + myQuote.auth);
        // });