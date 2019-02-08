/**
 * Created by alextorres on 7/17/17.
 */

const bodyparser = require('body-parser');
const logger = require('morgan');
const express = require('express');

const configurationManager = require('../common/config/configuration');
const apiName = configurationManager.info.name;


//starting server.
var jiraapi = express();
jiraapi.use(logger("dev"));
jiraapi.use(bodyparser.json());


jiraapi.get('/', function (req, res) {
    res.send(`Hi!, I'm ${configurationManager.info.name}!and my version is: ${configurationManager.info.version}`);
});


jiraapi.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

//endpoints rest.
jiraapi.all('/tod/*');
jiraapi.use('/tod/public/', require('./entrypoints/public/entrypoints_public'));
jiraapi.use('/tod/private/', require('./entrypoints/secured/entrypoints_secured'));


/*
jiraapi.use((req, res, next) =>{
    var err = new Error("Alex says: Requested URL doest not exist!!.");
    err.status = 404;
    next(err);
});
*/


//executing server.
var port = process.env.PORT || configurationManager.configuration.port;

jiraapi.listen(port, function () {
    console.log(`${apiName}running on port: ${port}`);
    console.log(`Jira service desk api using the following Token: ${configurationManager.endpoints.jiraservicedesk.token}`);

});
