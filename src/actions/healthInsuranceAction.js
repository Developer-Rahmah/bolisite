
import {GET_HEALTH_INSURANCE_TEXTS,RESET_HEALTH_INSURANCE_MESSAGE,HEALTH_INSURANCE_MESSAGE,RESET_HEALTH_COMPLETELY} from './types';
import client from '../constants';
import {Actions} from "react-native-router-flux";
import {scanned_id_image} from "../App";

//  const base_URL = 'https://bolisati.qiotic.info/app';

//START GETTING INPUTS TEXT ACTION
export const getHealthInsuranceTexts = ({prop, value}) => {
    return dispatch => {
      dispatch({type: GET_HEALTH_INSURANCE_TEXTS, payload: {prop, value}});
    }
  };
  //END GETTING INPUTS TEXT ACTION

  //START RESET MESSAGE
export const resetHealthInsuranceMessage = value => {
    return {type:RESET_HEALTH_INSURANCE_MESSAGE};
  };

  
  //END SHOW RESET MESSAGE

// START GO FROM HEALTH INSURANCE
  export const goFromHealthInsurance = ( full_name,id_number,age,Do_you_have_any_diseases,user_id,message,id_image) => {
    return (dispatch) => {
      if (full_name == ''||id_number==''|| age==''||Do_you_have_any_diseases==''||id_image==null) {
        dispatch({
          type: HEALTH_INSURANCE_MESSAGE,
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
           id_number:id_number,
           age:age,
           Do_you_have_any_diseases:Do_you_have_any_diseases,
           user_id:user_id
    }
    let type=null
    if(Do_you_have_any_diseases=='0'){
      type=2
    }
    else if(Do_you_have_any_diseases=='1'){
      type=1
    }

    var healthInfo={
      'name':full_name,
            'age':age,
            'user_id':user_id,
            'national_number':id_number,
            'disease':Do_you_have_any_diseases,id_image:id_image
    }
          // client.post(`addhealthorder`,{
          //   'name':full_name,
          //   'age':age,
          //   'user_id':user_id,
          //   'national_number':id_number,
          //   'disease':Do_you_have_any_diseases
          // }).then(function(response) {

          //   var order_id=response.data.order_id
          //   console.log("order_id",order_id)
          //   let apiUrl = 'https://bolisati.com/app/healthimage';

  
  
          //   var formData = new FormData();
          //   let uriParts = id_image.split('.');
          //              let uri=id_image
          //     let fileType = uriParts[uriParts.length - 1];
          //     formData.append('identity', {
          //       uri,
          //       name: `photo.${fileType}`,
          //       type: `image/${fileType}`,
          //     });
       
           
          
          //    let options = {
          //      method: 'POST',
          //      body: formData,
          //      headers: {
          //        Accept: 'application/x-www-from-urlencoded',
          //        'Content-Type': 'multipart/form-data',
          //      },
          //    };
          //    fetch(apiUrl, options).then(res=>{
          //    })
            client.post(`healthquestion`,{
    type:type
            }).then(function(response) {
              if(Actions.currentScene=="healthinsurance"){

           Actions.healthinsurancequestion({questions:response.data.data,user_id:user_id,healthInfo:healthInfo})
              }
    
  
            }).catch(function(error) {
              console.log("error11111111",error)
              const res = JSON.parse(error.request._response);
              dispatch({
                type: HEALTH_INSURANCE_MESSAGE,
                payload: {
                  isError: true,
                  isSuccess: false,
                  msg: res.data.message
                }
              });
          
    
            });
   

          // })
          // .catch(function(error) {
          //   console.log("error11111111",error)
          //   const res = JSON.parse(error.request._response);
          //   dispatch({
          //     type: HEALTH_INSURANCE_MESSAGE,
          //     payload: {
          //       isError: true,
          //       isSuccess: false,
          //       msg: res.message
          //     }
          //   });
        
  
          // });
        }
      }
    
  };
  //END GO FROM HEALTH INSURANCE

  // START GO FROM HEALTH INSURANCE QUESTION

  export const goFromHealthInsuranceQuestion = (questions,user_id,healthInfo) => {
    console.log("healthInfo",healthInfo)
        return (dispatch) => {
   client.post(`addhealthorder`,{
            'name':healthInfo.name,
            'age':healthInfo.age,
            'user_id':user_id,
            'national_number':healthInfo.national_number,
            'disease':healthInfo.disease
          }).then(function(response) {
console.log("response1",response)
            var order_id=response.data.order_id
            console.log("order_id",order_id)
            let apiUrl = 'https://bolisati.com/app/healthimage';

  
  
            var formData = new FormData();
            let uriParts = healthInfo.id_image.split('.');
                       let uri=healthInfo.id_image
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
             })
              client.post(`addlifequestions`,{
                'questions':questions,
                'order_id':order_id
              }).then(function(response) {
                if(Actions.currentScene=="healthinsurancequestion"){

  Actions.DoneScreen2({user_id:user_id,order_id:order_id,name:"health"})
  setTimeout(() => dispatch({type: RESET_HEALTH_COMPLETELY}), 1000);
                }
  scanned_id_image.full_name=""
  scanned_id_image.id_number=""
  scanned_id_image.skip_id_img=""
  scanned_id_image.date_of_birth=""
  scanned_id_image.scanned=false

                dispatch({
                  type: HEALTH_INSURANCE_MESSAGE,
                  payload: {
                    isError: false,
                    isSuccess: true,
                    msg: "success"
                  }
                });
    
              }).catch(function(error) {
                console.log("error11111111",error)
                const res = JSON.parse(error.request._response);
                dispatch({
                  type: HEALTH_INSURANCE_MESSAGE,
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
              type: HEALTH_INSURANCE_MESSAGE,
              payload: {
                isError: true,
                isSuccess: false,
                msg: res.message
              }
            });
        
  
          });
            }
          
        
      };
      //END GO FROM HEALTH INSURANCE QUESTION