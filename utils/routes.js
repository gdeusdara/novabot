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

        if (req.body.text.includes(' by: ')) {
            let newQuote = req.body.text.split(" by: ");

            console.log(newQuote);


            let users_list = await web.users.list();
            let at = new RegExp('@');

            let auth = users_list.members.find((member) => {
                return member.name == newQuote[1].replace(at, '');
            });

            let item = {
                quote: newQuote[0],
            };

            if (auth) {
                item.auth = auth.name;
                item.profile_image = auth.profile.image_72;
            } else {
                item.auth = newQuote[1];
                item.profile_image = '';
            }

            let data = new Quotes(item);
            data.save();

            res.send('Your new Quote: ' + item.quote + '\nautor: ' + item.auth);

        } else {

            let response_user = await web.users.profile.get({ user: req.body.user_id });
            let auth = response_user.profile.real_name;
            let profile_image = response_user.profile.image_72;

            let item = {
                quote: req.body.text,
                auth: auth,
                profile_image: profile_image,
            };
            let data = new Quotes(item);
            data.save();

            res.send('Your new Quote: ' + item.quote + '\nautor: ' + item.auth);
        }

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

