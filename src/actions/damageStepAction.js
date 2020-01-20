
import client from '../constants';
import {Actions} from "react-native-router-flux";
import {RESET_CAR_COMPLETELY} from './types'
//  const base_URL = 'https://bolisati.qiotic.info/app';

export const sendOrder = (data,full_name,addons,total,user_id) => {
console.log("data9955",data)
    return (dispatch) => {

          client.post(`addneworder`, data).then(function(response) {
            console.log("response12345",response)
          // Actions.payment({data:response.data.data[0],full_name:full_name,insurance_type:"Car Insurance",total:total,addons:addons,user_id:user_id,order_id:response.data.order_id})
          if(Actions.currentScene=="damagestep"){

          Actions.DoneScreen3({user_id:user_id,order_id:response.data.order_id,company_name:response.data.data[0].manufacturers_name,company_name_ar:response.data.data[0].manufacturers_name_ar});
          setTimeout(() => dispatch({type: RESET_CAR_COMPLETELY}), 1000);
          }
      
          }).catch(function(error) {
            console.log("error999",error)
            const res = JSON.parse(error.request._response);
      
          
          });
        }
      
  
    // }
  };