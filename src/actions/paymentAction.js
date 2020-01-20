import {GET_PAYMENT_TEXT,SHOW_PAYMENT_ONLINE_MODAL,SHOW_PAYMENT_UPON_DELIVERY_MODAL,RESET_TRAVEL_COMPLETELY,RESET_PAYMENT_COMPLETELY,GET_CITIES} from './types';
import client from '../constants';
import {Actions} from "react-native-router-flux";

//  const base_URL = 'https://bolisati.qiotic.info/app';

//START GETTING INPUTS TEXT ACTION
export const getPaymentTexts = ({prop, value}) => {
    return dispatch => {
      dispatch({type: GET_PAYMENT_TEXT, payload: {prop, value}});
    }
  };
  //END GETTING INPUTS TEXT ACTION
  //START GET CITIES
  export const getCities = () => {
  return (dispatch) => {
    client.post(`getzones?zone_country_id=108`).then((response) => {
      const res = response.data.data;
      dispatch({type: GET_CITIES, payload: res})
    }).catch((error) => {
        console.log("error",error)
      dispatch({type: GET_CITIES, payload: []})
    })
  }
  };
  //END GET CITIES
  //START SHOW/HIDE MODAL
  export const showPaymentOnlineModal = value => {
    return {type: SHOW_PAYMENT_ONLINE_MODAL, payload: value};
  };
  //END SHOW/HIDE MODAL

  //START SHOW/HIDE MODAL
  export const showPaymentUponDeliveryModal = value => {
    return {type: SHOW_PAYMENT_UPON_DELIVERY_MODAL, payload: value};
  };
  //END SHOW/HIDE MODAL

//START RESET TRAVEL
  export const resetTraveloCompletely = () =>
  {
    return dispatch =>
    {
      dispatch({type:RESET_TRAVEL_COMPLETELY});
    }
  
  }
  //END RESET TRAVEL
  //START GO FROM PAYMENT UPON DELIVERY
  export const goFromPaymentUponDeliveryInformation= ( area,address,user_id,order_id,type,company_name,company_name_ar,full_name,email,phone_number,payment_status) => {

console.log("payemnt_status",type)
    return (dispatch) => {
      if (full_name==""||email==""||area==""||address==""||phone_number=="") {
        // dispatch({
        //   type: SERVANT_INSURANCE_MESSAGE,
        //   payload: {
        //     isError: true,
        //     isSuccess: false,
        //     msg:message
        //   }
        // });
     
  
      }  
      
          else{
 
    
          client.post(`addaddress`,{
        
            city:area,
            details:address,
            order_id:order_id,
            type:type,
            payment_status:payment_status
          }).then(function(response) {
  console.log("responsesss",response)
            if(Actions.currentScene=="payment"){

       Actions.DoneScreen({user_id:user_id,order_id:order_id,company_name:company_name,company_name_ar:company_name_ar});
       dispatch({type: SHOW_PAYMENT_UPON_DELIVERY_MODAL, payload: false});

       setTimeout(() => dispatch({type: RESET_PAYMENT_COMPLETELY}), 1000);

            }
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
  //END GO FROM PAYMENT UPON DELIVERY

