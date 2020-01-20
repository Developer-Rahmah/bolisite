import {GET_SHIPPING_INSURANCE_TEXTS,RESET_SHIPPING_INSURANCE_MESSAGE,SHIPPING_INSURANCE_MESSAGE,GET_WHATS_TO_SHIPPING,GET_CARRIER,GET_COUNTRIES} from './types';
import client from '../constants';
import { AsyncStorage } from 'react-native';
import {Actions} from "react-native-router-flux";

//  const base_URL = 'https://bolisati.qiotic.info/app';

//START GETTING INPUTS TEXT ACTION
export const getShippingInsuranceTexts = ({prop, value}) => {
    return dispatch => {
      dispatch({type: GET_SHIPPING_INSURANCE_TEXTS, payload: {prop, value}});
    }
  };
  //END GETTING INPUTS TEXT ACTION

  //START SHOW/HIDE MODAL
export const resetShippingInsuranceMessage = value => {
    return {type:RESET_SHIPPING_INSURANCE_MESSAGE};
  };

  
  //END SHOW/HIDE MODAL

    //START GET WHAT TO SHIPPING
export const getWhatsToShipping = () => {
  return (dispatch) => {
    client.post(`whatsshipping`).then((response) => {
  
      const res = response.data.data;
      dispatch({type: GET_WHATS_TO_SHIPPING, payload: res})
    }).catch((error) => {
        console.log("error")
      dispatch({type: GET_WHATS_TO_SHIPPING, payload: []})
    })
  }
  };
  //END GET WHAT TO SHIPPING
    //START GET CARRIER
  export const getCarrier = () => {
    return (dispatch) => {
      client.post(`carriers`).then((response) => {
    
        const res = response.data.data;
        dispatch({type: GET_CARRIER, payload: res})
      }).catch((error) => {
          console.log("error")
        dispatch({type: GET_CARRIER, payload: []})
      })
    }
    };
    //END GET CARRIER
       //START GET COUNTRIES
  export const getCountries = () => {
    return (dispatch) => {
      client.post(`countries`).then((response) => {
        const res = response.data.data;
        dispatch({type: GET_COUNTRIES, payload: res})
      }).catch((error) => {
          console.log("error")
        dispatch({type: GET_COUNTRIES, payload: []})
      })
    }
    };
    //END GET COUNTRIES

    //START GO FROM SHIPPING INSURANCE
  export const goFromShippingInsurance = (name,what_your_shipping,shipped_date,shipped_from,shipped_to,carrier_name,user_id,message) => {

    return (dispatch) => {
      if (name == ''|| what_your_shipping==''||shipped_date==''||shipped_from==''||shipped_to==''||carrier_name=='') {
        dispatch({
          type: SHIPPING_INSURANCE_MESSAGE,
          payload: {
            isError: true,
            isSuccess: false,
            msg: message
          }
        });
    
  
      }  
      
          else{
         const data={ 
            name: name,
            what_your_shipping:what_your_shipping,
            shipped_date:shipped_date,
            shipped_from:shipped_from,
            shipped_to:shipped_to,
            carrier_name:carrier_name


    }
          client.post(`cargoinsurance`).then(function(response) {
     
            dispatch({
              type: SHIPPING_INSURANCE_MESSAGE,
              payload: {
                isError: false,
                isSuccess: true,
                msg: "success"
              }
            });
            Actions.insurancecompanies({
            insuranceCompanies:response.data.data,
            shippingInformation:data,
            user_id:user_id            
            });
            AsyncStorage.setItem("shipping_information",JSON.stringify(data));

          }).catch(function(error) {
            console.log("error11111111",error)
            const res = JSON.parse(error.request._response);
            dispatch({
              type: SHIPPING_INSURANCE_MESSAGE,
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
  //END Go FROM SHIPPING INSURANCE