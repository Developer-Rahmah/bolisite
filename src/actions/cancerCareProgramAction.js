import {GET_CANCER_CARE_PROGRAM_TEXTS,RESET_CANCER_CARE_PROGRAM_MESSAGE,CANCER_CARE_PROGRAM_MESSAGE,RESET_CANCER_CARE_COMPLETELY} from './types';
import client from '../constants';
import {Actions} from "react-native-router-flux";
import {scanned_id_image} from "../App";

//  const base_URL = 'https://bolisati.qiotic.info/app';

//START GETTING INPUTS TEXT ACTION
export const getCancerCareProgramTexts = ({prop, value}) => {
    return dispatch => {
      dispatch({type: GET_CANCER_CARE_PROGRAM_TEXTS, payload: {prop, value}});
    }
  };
  //END GETTING INPUTS TEXT ACTION

  //START RESET MESSAGE
export const resetCancerCareProgramMessage = value => {
    return {type:RESET_CANCER_CARE_PROGRAM_MESSAGE};
  };

  
  //END RESET MESSAGE

//START GO FROM CANCER PROGRAM PAGE
  export const goFromCancerCareProgram = (full_name, id_number,coverage,passport_number,nationality,are_you_jordanian,user_id,message,id_image,passport_image) => {
console.log("are_you_jordanian",are_you_jordanian)
console.log("nationality",nationality)
    return (dispatch) => {
      if (full_name == '' ||coverage=='') {
        dispatch({
          type: CANCER_CARE_PROGRAM_MESSAGE,
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
          coverage:coverage,
          user_id:user_id,
          passport_number:passport_number,
          are_you_jordanian:are_you_jordanian,
          country:nationality,
    }
    let apiUrl = 'https://bolisati.com/app/cancerimage';

  
  
      var formData = new FormData();

  if(are_you_jordanian==0){
    let uriParts = passport_image.split('.');
    let uri=passport_image
let fileType = uriParts[uriParts.length - 1];
formData.append('passportimage', {
uri,
name: `photo.${fileType}`,
type: `image/${fileType}`,
});
 
      }
      else if(are_you_jordanian==1){
        let uriParts = id_image.split('.');
        let uri=id_image
    let fileType = uriParts[uriParts.length - 1];
    formData.append('identity', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
    });

      }
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
          client.post(`addcancerorder`,{
            name:full_name,
            national_id:id_number,
            coverage:coverage,
            user_id:user_id,
            are_you_jordanian:are_you_jordanian,
            passport_number:passport_number,
            country:nationality

          }).then(function(response) {
            console.log("response",response)
      
            if(Actions.currentScene=="cancercareprogram"){

            Actions.DoneScreen4({user_id:user_id,order_id:response.data.order_id,name:"cancer"})
            setTimeout(() => dispatch({type: RESET_CANCER_CARE_COMPLETELY}), 1000);
            }
            scanned_id_image.full_name=""
            scanned_id_image.id_number=""
            scanned_id_image.skip_id_img=""
            scanned_id_image.scanned=false

          }).catch(function(error) {
            console.log("error11111111",error)
            const res = JSON.parse(error.request._response);
            dispatch({
              type: CANCER_CARE_PROGRAM_MESSAGE,
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
  //END GO FROM CANCER PROGRAM PAGE

