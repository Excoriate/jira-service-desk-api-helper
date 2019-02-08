/**
 * Created by alextorres on 8/12/17.
 */

/**
 * Created by alextorres on 8/12/17.
 */
const jiraApi = require('../endpoints/jiraservicedesk/JiraServiceDeskApiInformation');
const validator = require('../../common/utils/validator');
const jsonManager = require('../../common/utils/JsonManager');



var ticketInformation = {

    informationByTicket : (req, res, next)=>{

        let id = req.params.id;
        let statusPromise = jiraApi.getAllInformationByTicket(id);
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
                linkCustomer: jsonGot._links.web,
                createdDate : jsonGot.createdDate.friendly
            }

            let priorityPromise = jsonManager.extracValueOfArrayWithFieldId(result.requestFieldValues, 'priority');

            let summaryPromise = jsonManager.extracValueOfArrayWithFieldId(result.requestFieldValues, 'summary');

            priorityPromise
                .then((success)=>{

                    resultObject.priority = success.toString();

                    summaryPromise.
                    then((summary)=>{

                        console.log('Requesting ticket information of: ' + summary);
                        resultObject.summary = summary.toString();

                        res.send({
                            resultObject
                        });

                        next();

                    }).catch((failed)=>{
                        if(failed){
                            console.log('Cant get ticket summary. Sorry...');
                            resultObject.summary = 'Cant get ticket summary. Sorry...';
                        }
                    })

                })
                .catch((failed)=>{
                    if(failed){
                        console.log('Cant get ticket priority. Sorry...');
                        console.log(`Error details in promise: ${failed}`)

                        next();
                    }
                })

            }).catch((err)=>
            {
                if(err){
                    res.send({
                        err
                    });
                    next();
                }
            });

    },

    commentsByTicket: (req, res, next)=>{

    },

    lastUpdatesByTicket: (req, res, next)=>{

    }

};

module.exports = ticketInformation;

