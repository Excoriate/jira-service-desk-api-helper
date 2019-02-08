/**
 * Created by alextorres on 8/13/17.
 */
var validator = {

    checkSufixNumber : id =>{
        if(id.includes('-')){
            let prefix = id.split('-')[0];
            let sufix = id.split('-')[1];

            if(prefix.toUpperCase() == "TOD"){
                if(!isNaN(sufix)){
                    return true;
                }
            }
        }
    },

    checkIdParamIsVaslid : (id)=>{
        if (!(id == undefined || id == '' || id == null)) {
            return true;
        } else {
            return false;
        }

    }



};

module.exports = validator;




