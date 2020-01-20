
import {GET_LIFE_INSURANCE_TEXTS,RESET_LIFE_INSURANCE_MESSAGE,LIFE_INSURANCE_MESSAGE,MOTHER_SHOW_MODAL,FATHER_SHOW_MODAL,DAUGHTERS_SHOW_MODAL,SISTER_SHOW_MODAL,BROTHER_SHOW_MODAL,WIFE_SHOW_MODAL,HUSBAND_SHOW_MODAL,RESET_LIFE_COMPLETELY,GET_OCR_KEYS} from './types';
import client from '../constants';
import {Actions} from "react-native-router-flux";
import {scanned_id_image} from "../App";

//  const base_URL = 'https://bolisati.qiotic.info/app';

//START GETTING INPUTS TEXT ACTION
export const getLifeInsuranceTexts = ({prop, value}) => {
    return dispatch => {
      dispatch({type: GET_LIFE_INSURANCE_TEXTS, payload: {prop, value}});
    }
  };
  //END GETTING INPUTS TEXT ACTION

  //START SHOW/HIDE MODAL
export const resetLifeInsuranceMessage = value => {
    return {type:RESET_LIFE_INSURANCE_MESSAGE};
  };

  
  //END SHOW/HIDE MODAL

   //START SHOW/HIDE MODAL
   export const showMotherModal = value => {
    return dispatch => {
      dispatch({type: MOTHER_SHOW_MODAL, payload: value});
      // dispatch({type: RESET_LIFE_INSURANCE_MESSAGE});
    };
  };
  //END SHOW/HIDE MODAL
     //START SHOW/HIDE MODAL
     export const showFatherModal = value => {
      return dispatch => {
        dispatch({type: FATHER_SHOW_MODAL, payload: value});
        // dispatch({type: RESET_LIFE_INSURANCE_MESSAGE});
      };
    };
    //END SHOW/HIDE MODAL
       //START SHOW/HIDE MODAL
       export const showBrotherModal = value => {
        return dispatch => {
          dispatch({type: BROTHER_SHOW_MODAL, payload: value});
          // dispatch({type: RESET_LIFE_INSURANCE_MESSAGE});
        };
      };
      //END SHOW/HIDE MODAL
            //START SHOW/HIDE MODAL
            export const showHusbandModal = value => {
              return dispatch => {
                dispatch({type: HUSBAND_SHOW_MODAL, payload: value});
                // dispatch({type: RESET_LIFE_INSURANCE_MESSAGE});
              };
            };
            //END SHOW/HIDE MODAL
                 //START SHOW/HIDE MODAL
                 export const showWifeModal = value => {
                  return dispatch => {
                    dispatch({type: WIFE_SHOW_MODAL, payload: value});
                    // dispatch({type: RESET_LIFE_INSURANCE_MESSAGE});
                  };
                };
                //END SHOW/HIDE MODAL
             //START SHOW/HIDE MODAL
             export const showSisterModal = value => {
              return dispatch => {
                dispatch({type: SISTER_SHOW_MODAL, payload: value});
                // dispatch({type: RESET_LIFE_INSURANCE_MESSAGE});
              };
            };
            //END SHOW/HIDE MODAL
                      //START SHOW/HIDE MODAL
                      export const showDaughtersModal = value => {
                        return dispatch => {
                          dispatch({type: DAUGHTERS_SHOW_MODAL, payload: value});
                          // dispatch({type: RESET_LIFE_INSURANCE_MESSAGE});
                        };
                      };
                      //END SHOW/HIDE MODAL
//START GO FROM LIFE INSURANCE
  export const goFromLifeInsurance = (full_name, id_number, age,value_of_insurance,arr,user_id,message,message2,id_image,total) => {
console.log("id_imzzz",id_image)
    return (dispatch) => {
      if (full_name == '' || id_number == '' || age == ''||value_of_insurance==''||value_of_insurance==undefined||id_image==null) {
        dispatch({
          type: LIFE_INSURANCE_MESSAGE,
          payload: {
            isError: true,
            isSuccess: false,
            msg: message
          }
        });
     
  
      }  
 
      
          else{
         const data={ 
           full_name: full_name,
          id_number: id_number,
          age:age,
          value_of_insurance:value_of_insurance,
          beneficiaries:arr
    }

          client.post(`lifeinsurance`).then(function(response) {
            const res=response
        
            client.post(`lifequestion`).then(function(response) {
                        if(Actions.currentScene=="lifeinsurance"){

                     Actions.lifeinsurancequestion({
            insuranceCompanies:res.data.data,
            lifeInsuranceInformation:data,
            user_id:user_id,
            questions:response.data.data,
            id_image:id_image
            })
          }
  
            
                      }).catch(function(error) {
                        console.log("error11111111",error)
                        const res = JSON.parse(error.request._response);
                        dispatch({
                          type: LIFE_INSURANCE_MESSAGE,
                          payload: {
                            isError: true,
                            isSuccess: false,
                            msg: res.message
                          }
                        });
                    
              
                      });
          

          })
         .catch(function(error) {
            console.log("error11111111",error)
            const res = JSON.parse(error.request._response);
            dispatch({
              type: LIFE_INSURANCE_MESSAGE,
              payload: {
                isError: true,
                isSuccess: false,
                msg: res.message
              }
            });
 
  
          });
        }
      }
    
  };
  //END GO FROM LIFE INSURANCE
// START GO FROM LIFE QUESTION
  export const goFromLifeInsuranceQuestion=(lifeInsuranceInformation,user_id,questions,id_image)=>{
    console.log("id_image",id_image)
 
    return (dispatch) => {
      client.post(`addlifeorder`,{
        'national_id' :lifeInsuranceInformation.id_number,
        'name' :lifeInsuranceInformation.full_name,
        'age' :lifeInsuranceInformation.age,
        'user_id':user_id,
        'value_of_insurance':lifeInsuranceInformation.value_of_insurance,
        'beneficiaries':lifeInsuranceInformation.beneficiaries,
        'questions':questions
      }).then(function(response) {

        if(Actions.currentScene=="lifeinsurancequestion"){
          let apiUrl = 'https://bolisati.com/app/lifeimage';

          console.log("id_image",id_image)
          
              var formData = new FormData();
              let uriParts = id_image.split('.');
              let uri=id_image
        let fileType = uriParts[uriParts.length - 1];
        formData.append('identity', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
        });
        
               let options = {
                 method: 'POST',
                 body: formData,
                 headers: {
                   Accept: 'application/x-www-from-urlencoded',
                   'Content-Type': 'multipart/form-data',
                 },
               };
               fetch(apiUrl, options).then(res=>{
                         console.log('response test',res)
               })
        Actions.DoneScreen2({user_id:user_id,order_id:response.data.order_id,name:"life"})
        setTimeout(() => dispatch({type: RESET_LIFE_COMPLETELY}), 1000);
        }
        scanned_id_image.full_name=""
        scanned_id_image.id_number=""
        scanned_id_image.skip_id_img=""
        scanned_id_image.date_of_birth=""
        scanned_id_image.scanned=false

        dispatch({
          type: LIFE_INSURANCE_MESSAGE,
          payload: {
            isError: false,
            isSuccess: true,
            msg: "success"
          }
        });
   
      })
    }
  }
  //END GO FROM LIFE QUESTION