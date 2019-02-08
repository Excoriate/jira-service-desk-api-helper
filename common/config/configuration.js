/**
 * Created by alextorres on 8/10/17.
 */

const config = require('../files/apiconfiguration.json');
const endpoints = require('../files/endpointsconfiguration.json');

var configurationManager = {

    info: {
        name: config.info.name,
        version: config.info.version
    },

    configuration: {
        port: config.configuration.port,
        secure: config.configuration.secure
    },

    endpoints:
        {
            jiraservicedesk: {
                uris: {
                    slabyticket: endpoints.jiraservicedesk.endpoints.slabyticket,
                    ticketbyid: endpoints.jiraservicedesk.endpoints.ticketbyid
                },
                connection : {
                    user: endpoints.jiraservicedesk.connection.authorization.user,
                    password: endpoints.jiraservicedesk.connection.authorization.password
                },
                token: endpoints.jiraservicedesk.connection.token
            }
        }

};


module.exports = configurationManager;


