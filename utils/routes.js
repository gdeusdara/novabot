const express = require('express');
const router = express.Router();
const Quotes = require('./mongo');
const { WebClient, ErrorCode } = require('@slack/web-api');
const env = require('dotenv');

env.config();

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

//Create quote
router.post('/', async (req, res) => {
    console.log(req.body);

    var user_id = req.body.user_id;
    var response_user = await web.users.profile.get({user: user_id, token: process.env.SLACK_TOKEN});
    res.send(response_user);    

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
            auth: 'Desconhecido',
        };
        var data = new Quotes(item);
        data.save();

    }

    res.send('Your new Quote: ' + item.quote + '\nautor: ' + item.auth);

})

// get all quotes
router.get('/get-quotes', async (req, res) => {
    Quotes.find()  
    .then(function(quotes) {  
        res.json(quotes);  
    });
});

module.exports = router;

