const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const env = require('dotenv');
const app = express();
const { WebClient, ErrorCode } = require('@slack/web-api');
const routes = require('./utils/routes');

env.config();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

app.use('/', routes);

//Start server
app.listen(port, (req, res) => {    
    console.log(`server listening on port: ${port}`)
});