/**
 * Created by alextorres on 8/12/17.
 */

const restclient = require('requestify');
const config= require('../../../common/config/configuration');
const uriparser = require('../../../common/utils/uriparser');

var jiraApiInformation = {

    getAllInformationByTicket : (id)=>{

        return new Promise((resolve, reject)=>{

            let promise = uriparser.insertTicketIdInUri(id);
            promise.then((finalUri)=>
            {
                let uri = finalUri;

                console.log(`Requesting uri: ${uri}`);
                console.log(`Requested ticket ID: ${id.toUpperCase()}`);
                console.log(`Trying Jira Serv. Desk api (Getting Ticket all Information) connection with ${config.endpoints.jiraservicedesk.connection.user} user`);


                restclient.get(uri, {
                    headers:
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': config.endpoints.jiraservicedesk.token
                        },
                    auth:
                        {
                            username: config.endpoints.jiraservicedesk.connection.user,
                            password: config.endpoints.jiraservicedesk.connection.password
                        },
                    dataType: 'json'
                })
                    .then(function(response) {
                        response.getBody();
                        response.getHeaders();
                        response.getHeader('Accept');
                        response.getCode();
                        response.body;
                        resolve(response.getBody());
                    })
                    .fail(function(response) {
                        console.log(`Jira Serv. Desk native api respond with an error: HTTP Code: ${response.getCode()}`);
                        console.log(`HTTP Body response: ${response.body}`);

                        if(response.getCode() !== 200){
                            var objErr = {
                                errorCode: response.getCode(),
                                message: response.body
                            };

                            reject(objErr);
                        }
                    });
            })
                .catch((err)=>{
                    reject(err)

                });
        });

    },

    getCommentsByTicket: (id) =>{

    },

    getLastUpdateInTicket: (id) =>{

    }
};

module.exports = jiraApiInformation;
