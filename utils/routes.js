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
    
    if (req.body.text === '') {

        res.send('Você não mandou nenhum quote! ):');

    } else {

        var response_user = await web.users.profile.get({ user: req.body.user_id });
        var sent_by = response_user.profile.real_name;
        var profile_image = response_user.profile.image_72;

        if (req.body.text.includes(' by: ')) {

            var newQuote = req.body.text.split(" by: ");

            console.log(newQuote);

            var item = {
                quote: newQuote[0],
                auth: newQuote[1],
                sent_by: sent_by,
                profile_image: profile_image,
            };
            var data = new Quotes(item);
            data.save();

        } else {
            var item = {
                quote: req.body.text,
                auth: 'Desconhecido',
                sent_by: sent_by,
                profile_image: profile_image,
            };
            var data = new Quotes(item);
            data.save();

        }

        res.send('Your new Quote: ' + item.quote + '\nautor: ' + item.auth);
    }

})

// get all quotes
router.get('/get-quotes', async (req, res) => {
    Quotes.find()
        .then(function (quotes) {
            res.json(quotes);
        });
});

module.exports = router;

