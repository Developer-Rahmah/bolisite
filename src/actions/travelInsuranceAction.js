
import axios from 'axios';
import {GET_TRAVEL_INSURANCE_TEXTS,RESET_TRAVEL_INSURANCE_MESSAGE,TRAVEL_INSURANCE_MESSAGE,RESET_TRAVEL_COMPLETELY} from './types';
import client from '../constants';
import { AsyncStorage } from 'react-native';
import {Actions} from "react-native-router-flux";
const validate_email=  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
import {scanned_passport_image} from "../App";

//  const base_URL = 'https://bolisati.qiotic.info/app';

//START GETTING INPUTS TEXT ACTION
export const getTravelInsuranceTexts = ({prop, value}) => {
    return dispatch => {
      dispatch({type: GET_TRAVEL_INSURANCE_TEXTS, payload: {prop, value}});
    }
  };
  //END GETTING INPUTS TEXT ACTION

  //START SHOW/HIDE MODAL
export const resetTravelInsuranceMessage = value => {
    return {type:RESET_TRAVEL_INSURANCE_MESSAGE};
  };

  
  //END SHOW/HIDE MODAL



  export const goFromTravelInsurance = ( from,to,days_to_stay,age,user_id,category_id,message) => {
    return (dispatch) => {
      if (from == ''||to==''||to==undefined||days_to_stay==''||days_to_stay==undefined||age==''||age==undefined) {
        dispatch({
          type: TRAVEL_INSURANCE_MESSAGE,
          payload: {
            isError: true,
            isSuccess: false,
            msg:message
          }
        });
     
  
      }  
      
          else{
         const data={ 
  
           from:from,
           to:to,
           days_to_stay:days_to_stay,
           age:age
    }
          client.post(`travelinsurance`,{
            'age':age,
            'region':to,
            'days':days_to_stay
          }).then(function(response) {
      
            if(Actions.currentScene=="travelinsuranceinformation"){

            Actions.insurancecompanies({
            insuranceCompanies:response.data.data,
            travelInformation:data,
            user_id:user_id,
            category_id:category_id,
insurance_type:"Travel Insurance"
            });
          }
            AsyncStorage.setItem("travel_information",JSON.stringify(data));

          }).catch(function(error) {
            console.log("error11111111",error)
            const res = JSON.parse(error.request._response);
            dispatch({
              type: TRAVEL_INSURANCE_MESSAGE,
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
  //END Go  ACTION
  export const finishTravelInsurance = ( full_name,passport_number,from,to,travel_date,days_to_stay,email,phone_number,total,user_id,insuranceCompaanyId,companyOldPrice,companyDiscountRate,addons,passportImage,insurance_type,message,message2,country) => {
    console.log("total11",total)
    console.log("companyOldPruce",companyOldPrice)
    console.log("companydiscountrate",companyDiscountRate)
        return (dispatch) => {
          if (full_name == ''||passport_number==''||travel_date==''||email==''||phone_number==''||passportImage==null||country=='') {
            dispatch({
              type: TRAVEL_INSURANCE_MESSAGE,
              payload: {
                isError: true,
                isSuccess: false,
                msg:message
              }
            });
         
      
          }  
          else if (validate_email.test(email) === false) {
            dispatch({
              type: TRAVEL_INSURANCE_MESSAGE,
              payload: {
                isError: true,
                isSuccess: false,
                msg: message2
              }
            });
          } 
          
              else{
             const data={ 
      full_name:full_name,
      passport_number:passport_number,
      travel_date:travel_date,
      email:email,
      phone_number:phone_number,
               from:from,
               to:to,
               days_to_stay:days_to_stay,
               total:total,
               user_id:user_id,
               company_id:insuranceCompaanyId
        }
        let apiUrl = 'https://bolisati.com/app/travelimage';
    
      
      
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
           console.log("country destination",country)
           console.log("totaaal",total)
        client.post(`addtravelorder`,{
          'passport_number' :passport_number,
          'name' :full_name,
          'travel_date' :travel_date,
          'travel_from' :from,
          'region' :to,
          'days_to_stay':days_to_stay,
           'email':email,
           'phone_number':phone_number,
          'company_id' :insuranceCompaanyId,
    'old_price':companyOldPrice,
    'dis_rate':companyDiscountRate,
          'total':total,
          'user_id':user_id,
          'destination':country
        }).then(function(response) {
     console.log("7778",response)
                if(Actions.currentScene=="travelinsurance"){
    
                // Actions.payment({data:response.data.data[0],full_name:full_name,insurance_type:"Travel Insurance",total:total,addons:addons,user_id:user_id,order_id:response.data.order_id,company_name:response.data.company_name,company_name_ar:response.data.company_name_ar})
                Actions.DoneScreen3({user_id:user_id,order_id:response.data.order_id,company_name:response.data.company_name,company_name_ar:response.data.company_name_ar});
    
                setTimeout(() => dispatch({type: RESET_TRAVEL_COMPLETELY}), 1000);
                }
           scanned_passport_image.full_name=""
           scanned_passport_image.passport_number=""
           scanned_passport_image.skip_passport_img=""
           scanned_passport_image.scanned=false
    
    
              }).catch(function(error) {
                console.log("error11111111",error)
                const res = JSON.parse(error.request._response);
                dispatch({
                  type: TRAVEL_INSURANCE_MESSAGE,
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