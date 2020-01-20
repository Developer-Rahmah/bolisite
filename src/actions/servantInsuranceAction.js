import {GET_SERVANT_INSURANCE_TEXTS,RESET_SERVANT_INSURANCE_MESSAGE,SERVANT_INSURANCE_MESSAGE,RESET_SERVANT_COMPLETELY} from './types';
import client from '../constants';
import {Actions} from "react-native-router-flux";
import {scanned_passport_image} from "../App";

//  const base_URL = 'https://bolisati.qiotic.info/app';

//START GETTING INPUTS TEXT ACTION
export const getServantInsuranceTexts = ({prop, value}) => {
    return dispatch => {
      dispatch({type: GET_SERVANT_INSURANCE_TEXTS, payload: {prop, value}});
    }
  };
  //END GETTING INPUTS TEXT ACTION

  //START SHOW/HIDE MODAL
export const resetServantInsuranceMessage = value => {
    return {type:RESET_SERVANT_INSURANCE_MESSAGE};
  };

  
  //END SHOW/HIDE MODAL

//START FROM SERVANT INSURANCE
  export const goFromServantlInsurance = ( nationality,user_id,message) => {
    return (dispatch) => {
      if (nationality == '') {
        dispatch({
          type: SERVANT_INSURANCE_MESSAGE,
          payload: {
            isError: true,
            isSuccess: false,
            msg:message
          }
        });
     
  
      }  
      
          else{
         const data={ 
  
      nationality:nationality
    }


            Actions.Uploadpassport({
            servantInformation:data,
            user_id:user_id,
            typee:"Servant Insurance"       
            });

          }
        
      }
    
  };
  //END FROM SERVANT INSURANCE
// START  GO FROM SERVANT INFORMATION
  export const goFromServantInsuranceInformation= ( full_name,passport_number,nationality,user_id,message,passportImage) => {

    return (dispatch) => {
      if (full_name == ''||passport_number==''||nationality==''||passportImage==null) {
        dispatch({
          type: SERVANT_INSURANCE_MESSAGE,
          payload: {
            isError: true,
            isSuccess: false,
            msg:message
          }
        });
     
      }  
      
          else{
         const data={ 
            full_name:full_name,
            passport_number:passport_number,
            nationality:nationality
    }
    let apiUrl = 'https://bolisati.com/app/servantimage';

  
  
      var formData = new FormData();
  

      let uriParts = passportImage.split('.');
                       let uri=passportImage
              let fileType = uriParts[uriParts.length - 1];
              formData.append('passport', {
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
          client.post(`addservantorder`,{
            user_id:user_id,
            passport_number:passport_number,
            name:full_name,
            nationality:nationality
          }).then(function(response) {
      
  
            if(Actions.currentScene=="servantinsuranceinformation"){
       Actions.DoneScreen2({user_id:user_id,order_id:response.data.order_id,name:"servant"});
       setTimeout(() => dispatch({type: RESET_SERVANT_COMPLETELY}), 1000);
            }
       scanned_passport_image.full_name=""
       scanned_passport_image.passport_number=""
       scanned_passport_image.skip_passport_img=""
       scanned_passport_image.scanned=false

          }).catch(function(error) {
            console.log("error11111111",error)
            const res = JSON.parse(error.request._response);
            dispatch({
              type: SERVANT_INSURANCE_MESSAGE,
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
  //END  GO FROM SERVANT INFORMATION