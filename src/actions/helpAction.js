import {GET_HELP_TEXT, START_LOADING, RESET_HELP_MESSAGE, HELP_MESSAGE, RESET_PAGE_COMPLETELY,GET_INFO} from './types';
import client from '../constants';

const validate_email=  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//START GETTING INPUTS TEXT ACTION
export const getHelpText = ({prop, value}) => {
  var obj = {
    type: GET_HELP_TEXT,
    payload: {
      prop,
      value
    }
  };
  return obj;
};
//END GETTING INPUTS TEXT ACTION
  //START RESET MESSAGE
  export const resetHelpMessage = value => {
    return {type:RESET_HELP_MESSAGE};
  };
  //END RESET MESSAGE
//START SUBMIT MESSAGE
export const submitMessage = ( email,subject, msg,user_id,message,message2) => {


  return (dispatch) => {
    if (email == '' || subject == '' || msg == '') {
      dispatch({
        type: HELP_MESSAGE,
        payload: {
          isError: true,
          isSuccess: false,
          msg: message
        }
      });
    } 
    else if (validate_email.test(email) === false) {
      dispatch({
        type: HELP_MESSAGE,
        payload: {
          isError: true,
          isSuccess: false,
          msg: message2
        }
      });
    } 
    else {
      dispatch({
        type: START_LOADING,
        payload: {
          loading: true
        }
      });
      client.post(`help`, {
        "email": email,
        "message": msg,
        "subject":subject,
        user_id:user_id
      }).then(function(response) {
        const message3 = response.data.message;
        dispatch({
          type: HELP_MESSAGE,
          payload: {
            isError: false,
            isSuccess: true,
            msg: message3
          }
        });
        dispatch({
          type: START_LOADING,
          payload: {
            loading: false
          }
        });

        setTimeout(() => dispatch({type: RESET_PAGE_COMPLETELY}), 1000);

      }).catch(function(error) {
        console.log('error', error.request._response);
        const res = JSON.parse(error.request._response);
        dispatch({
          type: START_LOADING,
          payload: {
            loading: false
          }
        });
        dispatch({
          type: HELP_MESSAGE,
          payload: {
            isError: true,
            isSuccess: false,
            msg: res.message
          }
        });
        setTimeout(() => dispatch({type: RESET_HELP_MESSAGE}), 1000);
      });

    }
  }
};
//END SUBMIT MESSAGE
//START GET INFO
export const getInfo = () => {
  return (dispatch) => {
    client.post(`appcontact`).then((response) => {
      const res = response.data.data[0];
      dispatch({type: GET_INFO, payload: res})

    }).catch((error) => {
        console.log("error",error)
      dispatch({type: GET_INFO, payload: []})

    })
  }
};
//END GET INFO
