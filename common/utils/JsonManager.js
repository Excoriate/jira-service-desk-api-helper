/**
 * Created by alextorres on 8/13/17.
 */
var jsonManager = {

    extracValueOfArrayWithFieldId: (array, value) =>{
        return new Promise((resolve, reject)=>{

            let valueReturned ='';

            if(array !== null && array !== undefined){
                if(array.length !==0){
                    for(var i=0; i< array.length; i++){
                        if(array[i].fieldId == value){

                            if(value =='priority'){
                                valueReturned = array[i].value.name.toString();
                            }else{
                                valueReturned = array[i].value.toString();
                            }
                            break;
                        }
                    }

                    if(valueReturned ==''){
                        reject(`cant find value ${value} in Array ${array}`);
                    }else{
                        resolve(valueReturned);
                    }
                }
            }else{
                reject(`Error in JsonManager. Array is empty or has not values! | array: ${array}`);
            }
        });
    }
};

module.exports = jsonManager;