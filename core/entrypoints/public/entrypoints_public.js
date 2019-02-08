/**
 * Created by alextorres on 8/10/17.
 */

const express = require('express');
var router = express.Router();

//public entrypoint only for testing
router.get('/hi/', function (req, res, next) {
    res.send('Hi!, your are testing the root entry point! :)');

});

//core domains.
var jiraTicketStatus = require('../../domain/ticketStatus');
var jiraTicketInformation = require('../../domain/ticketInformation');
var jiraTicketSla = require('../../domain/ticketSla');
var jiraTIcketActivity = require('../../domain/ticketActivity');

//todo: Separate domain logic in differents domain JS files.

router.get('/status/:id', jiraTicketStatus.ticketStatusById);
router.get('/priority/:id', jiraTicketStatus.ticketPriorityById);
router.get('/information/:id', jiraTicketInformation.informationByTicket);
router.get('/comments/:id', jiraTicketInformation.commentsByTicket);
router.get('/updates/:id', jiraTicketInformation.lastUpdatesByTicket);




router.get('*', function (req, res) {
    res.send('Alex says: wtf dude! im not a valid uri! :D')
})


module.exports = router;







