import {GET_ORDERS,ORDERS_LOADING,SHOW_CANCEL_ORDER_MODAL,GET_REASONS, GET_ORDERS_TEXTS,RESET_VALUES} from './types';
import client from '../constants';
import {Actions} from "react-native-router-flux";
//START GET ORDER TEXTS
export const getOrdersTexts = ({prop, value}) => {
  return dispatch => {
    dispatch({type: GET_ORDERS_TEXTS, payload: {prop, value}});
  }
};
//END GET ORDER TEXTS
//START RESET VALUES
export const resetFilterValues = () => {
  return ({type: RESET_VALUES})
}
//END RESET VALUES
//START GET REASONS
export const getReasons = () => {
  return (dispatch) => {
    client.post(`reasons`).then((response) => {
      const res = response.data.data;
      dispatch({type: GET_REASONS, payload: res})
    }).catch((error) => {
        console.log("errorlll")
      dispatch({type: GET_REASONS, payload: []})
    })
  }
  };
  //END GET REASONS
  //START REJECT ORDER
  export const rejectOrder = (order_id,user_id,language_id) => {
    return (dispatch) => {
      client.post(`rejectoffer`,{
        order_id:order_id
      }).then((response) => {
    Actions.orderspage({user_id:user_id,language_id:language_id})

        const res = response.data.data;
      }).catch((error) => {
          console.log("errorlll")
      })
    }
    };
  //END REJECT ORDER

  //START SEND REASON
export const sendReason = (orderId,reasonId,user_id,language_id,reason_message) => {
  console.log("2222",reason_message)
  return (dispatch) => {

    client.post(`addreasons`,{
      reason:reasonId,
      order_id:orderId,
      reason_message:reason_message
    }).then((response) => {
console.log("response",response)
      const res = response.data.data;
      dispatch({type: SHOW_CANCEL_ORDER_MODAL, payload: false})
      if(Actions.currentScene=="orderspage"){

      Actions.orderspage({user_id:user_id,language_id:language_id})
    
      }
    }).catch((error) => {
        console.log("error",error)
      dispatch({type: GET_REASONS, payload: []})
    })

  }
  };
  //END SEND REASON
       //START GET ORDERS
       var a=null
  export const getOrders = (user_id,language_id,days,id) => {
    console.log("user_id",user_id)
    console.log("days",days)
    console.log("id",id)

    return (dispatch) => {
      dispatch({type: ORDERS_LOADING, payload: true})

      client.post(`myorder`,{
          user_id:user_id,
          language_id : language_id,
          days:days,
          id:id
      }).then((response) => {
        console.log("response",response)
        const res = response.data;
        console.log("res",res)
        a=response.data.data
        dispatch({type: GET_ORDERS, payload: res})
        dispatch({type: ORDERS_LOADING, payload: false})

      }).catch((error) => {
          console.log("error",error)
        dispatch({type: GET_ORDERS, payload: []})
        dispatch({type: ORDERS_LOADING, payload: false})

      })
    }
    };
    //END GET ORDERS
  
  
     //START SHOW/HIDE MODAL
  export const showCancelOrderModal = value => {
    return {type: SHOW_CANCEL_ORDER_MODAL, payload: value};
  };
  //END SHOW/HIDE MODAL

