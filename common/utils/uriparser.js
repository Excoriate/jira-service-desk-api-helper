/**
 * Created by alextorres on 8/10/17.
 */

const config= require('../config/configuration');
const validator = require('../utils/validator');


//Posibilities: TOD-XX | tod-XX | XX | 'stringinvalid' | 'stringinvalid'-XX | '' | null
function addPrefix (id){
    return new Promise((resolve, reject)=>{

        let temporalyId = '';

        if(id =='' || id == undefined || id == null){
            reject('the ticket ID parameter was passed with an invalid value.');
        }else{
            if(!isNaN(id)){
                //is a fucking number.
                temporalyId = `TOD-${id}`;
                resolve(temporalyId);
            }else{
                //is not a number.
                //the parameter sent by slack is a valid ticket key ID (format: tod-xx or TOD-xx)
                if(id.includes('tod-')){
                    temporalyId = id.replace('tod-', 'TOD-');
                    resolve(temporalyId);
                }else{
                    //the prefix TOD lower or upper case is not included.
                    if(id.includes('TOD-')){
                        if(validator.checkSufixNumber(id)){
                            resolve(id);
                        }
                    }
                    reject(`Invalid string parameter. This is not a valid ticket Key formato: ${id}`);
                }
            }
        }
    })
}

var parser =  {

    insertTicketIdInUri : (id)=>{

        return new Promise((resolve, reject)=>{

            //var parsedId = addPrefixInTicketId(id);
            let parsedId;

            addPrefix(id).
                then((finalId)=>
                {
                        parsedId = finalId;
                        console.log(`parsed final ticket ID: ${parsedId}`);

                        var urlForTicket = config.endpoints.jiraservicedesk.uris.ticketbyid;

                        if(urlForTicket =='' || urlForTicket ==undefined){
                            reject (`uri param is undefined or empty. Param: ${urlForTicket}`);
                        }

                        let finalUri = urlForTicket.replace('{ticketid}', parsedId);

                        resolve(finalUri);
                })
                .catch((err)=>{
                    console.log('Error during parsing ticket ID. Error details: ' + err);
                    reject(err);
                })

        });
    }
};


module.exports = parser;
