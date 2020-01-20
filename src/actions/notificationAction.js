import {GET_NOTIFICATIONS,NOTIFICATIONS_LOADING,SHOW_CANCEL_ORDER_MODAL,GET_REASONS} from './types';
import client from '../constants';
import {Actions} from "react-native-router-flux";

//  const base_URL = 'https://bolisati.qiotic.info/app';
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

  //START SEND REASON 
export const sendReason = (orderId,reasonId,user_id,language_id) => {
  return (dispatch) => {

    client.post(`addreasons`,{
      reason:reasonId,
      order_id:orderId
    }).then((response) => {

      const res = response.data.data;
      dispatch({type: GET_REASONS, payload: res})
      setTimeout(
        () => dispatch({type: SHOW_CANCEL_ORDER_MODAL, payload: false}),

        1000
      );
      Actions.orderspage({user_id:user_id,language_id:language_id})
    

    }).catch((error) => {
        console.log("error")
      dispatch({type: GET_REASONS, payload: []})
    })

  }
  };
  //END SEND REASON   
       //START GET NOTIFICATIONS
       var a=null
  export const getNotifications = (user_id,language_id) => {
    return (dispatch) => {
      dispatch({type: NOTIFICATIONS_LOADING, payload: true})

      client.post(`notification?user_id=${user_id}`).then((response) => {
        const res = response.data.data;
        a=response.data.data
        dispatch({type: GET_NOTIFICATIONS, payload: res})
        dispatch({type: NOTIFICATIONS_LOADING, payload: false})

      }).catch((error) => {
          console.log("error")
        dispatch({type: GET_NOTIFICATIONS, payload: []})
        dispatch({type: NOTIFICATIONS_LOADING, payload: false})

      })
    }
    };
    //END GET NOTIFICATIONS

     //START SHOW/HIDE MODAL
  export const showCancelOrderModal = value => {
    return {type: SHOW_CANCEL_ORDER_MODAL, payload: value};
  };
  //END SHOW/HIDE MODAL

