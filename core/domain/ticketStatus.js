/**
 * Created by alextorres on 8/12/17.
 */
const jiraapi = require('../endpoints/jiraservicedesk/JiraServiceDeskApiStatus');
const validator = require('../../common/utils/validator');
const jsonManager = require('../../common/utils/JsonManager');

var ticketStatusDomain = {

        ticketPriorityById: (req, res, next)=>{

            let id = req.params.id;
            let summary = '';
            let statusPromise = jiraapi.getTicketStatusById(id);
            let resultObject;
            var jsonGot ={};

            statusPromise.
            then((result)=>
            {
                jsonGot = result;

                resultObject ={
                    status: jsonGot.currentStatus.status,
                    ticketId: jsonGot.issueKey,
                    reporter: jsonGot.reporter.displayName,
                    linkCustomer: jsonGot._links.web
                }

                let parameterPromise = jsonManager.extracValueOfArrayWithFieldId(result.requestFieldValues, 'priority');

                parameterPromise
                    .then((success)=>{
                        resultObject.priority = success.toString();

                        res.send({
                            resultObject
                        });

                        next();
                    })
                    .catch((failed)=>{
                        if(failed){
                            summary = 'Cant get ticket priority. Sorry...'
                        }
                    })

            }).catch((err)=>
            {
                if(err){
                    res.send({
                        err
                    });
                }
                next();
            });

        },

        ticketStatusById: (req, res, next)=>{

            let id = req.params.id;
            let summary = '';
            let statusPromise = jiraapi.getTicketStatusById(id);
            let resultObject;
            var jsonGot ={};

            statusPromise.
                then((result)=>
                {
                    jsonGot = result;

                    resultObject ={
                        status: jsonGot.currentStatus.status,
                        ticketId: jsonGot.issueKey,
                        reporter: jsonGot.reporter.displayName,
                        linkCustomer: jsonGot._links.web
                    }

                    let parameterPromise = jsonManager.extracValueOfArrayWithFieldId(result.requestFieldValues, 'summary');

                    parameterPromise
                        .then((success)=>{
                            resultObject.summary = success.toString();

                            res.send({
                                resultObject
                            });

                            next();
                        })
                        .catch((failed)=>{
                            if(failed){
                                summary = 'Cant get ticket summary. Sorry...'
                            }
                            next();
                        })

                }).catch((err)=>
                {
                    if(err){
                        res.send({
                            err
                        });
                    }

                    next();
                });

        }

};


module.exports = ticketStatusDomain;