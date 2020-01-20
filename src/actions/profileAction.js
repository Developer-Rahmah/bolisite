import {
    GET_PROFILE_INFO,
    UPDATE_PROFILE_INFO,
    GET_PROFILE_TEXT,
    PROFILE_MSG,
    RESET_PROFILE_MSG,
    START_PROFILE_LOADING,
    SHOW_RESET_PASSWORD_MODAL
  } from "./types";
  
  import {Actions} from "react-native-router-flux";
  import axios from "axios";
  import {AsyncStorage} from "react-native";
  import {Keyboard} from "react-native";
  import client from '../constants';
  var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])");


  //START FETCHING PROFILE TEXT
  export const getProfileText = ({prop, value}) => {
    return {type: GET_PROFILE_TEXT, payload: {prop, value}};
  };
  //END FETCHING PROFILE TEXT
   //START SHOW/HIDE MODAL
export const showResetPasswordModal = value => {
  return dispatch => {
    dispatch({type: SHOW_RESET_PASSWORD_MODAL, payload: value});
    dispatch({type: RESET_PROFILE_MSG});
  };
};
//END SHOW/HIDE MODAL
//START RESET PROFILE MESSAGE
  export const resetProfileMessage = () => {
    return {type: RESET_PROFILE_MSG};
  };
  //END RESET PROFILE MESSAGE
  //START GET PROFILE INFO
  export const getProfileInfo = () => {
    return dispatch => {
        AsyncStorage.getItem('user', (err, result) => {
            if (result != null) {
              result=JSON.parse(result)
                dispatch({type: GET_PROFILE_INFO, payload: result[0]});            }
            else{
                dispatch({type: GET_PROFILE_INFO, payload: []});
            }
           
          });

    };
//END GET USER INFO
    // return (dispatch) => {
    //   client.post(`customerinfo?id=${user_id}`).then((response) => {
    //     const res = response.data.data;
    //     dispatch({type: GET_PROFILE_INFO, payload: res})
  
    //   }).catch((error) => {
    //       console.log("error")
    //     dispatch({type: GET_PROFILE_INFO, payload: []})
  
    //   })
    // }
  };
  //END GET PROFILE INFO
  
  
  //START UPDATE PROFILE INFO
  export const updateProfileInfo = data => {
    const {customers_firstname, customers_lastname,customers_id} = data;
    if (customers_firstname == "" || customers_lastname == "") {
      return {
        type: PROFILE_MSG,
        payload: {
          isChangePass: false,
          isError: true,
          isSuccess: false,
          msg: "Please make sure you've filled all fields"
        }
      };
    } 
   
    else {
      Keyboard.dismiss();
      return dispatch => {
        dispatch({
          type: START_PROFILE_LOADING,
          payload: {
            update_profile_Btn: true,
            reset_pass_btn: false
          }
        });
  
        client.post(`/updatecustomerinfo`, data)
          .then(response => {
        
            Actions.home()
            dispatch({
              type: START_PROFILE_LOADING,
              payload: {
                update_profile_Btn: false,
                reset_pass_btn: false
              }
            });
          })
          .catch(error => {
            dispatch({
              type: PROFILE_MSG,
              payload: {
                isChangePass: false,
                isError: true,
                isSuccess: false,
                msg: JSON.parse(error.request._response)
              }
            });
            dispatch({
              type: START_PROFILE_LOADING,
              payload: {
                update_profile_Btn: false,
                reset_pass_btn: false
              }
            });
          });
      };
    }
  };
  //END Update PROFILE INFO
  
  //START CHANGING USER Password
export const changePassword = (currentPass, newPass, confirmPass,user_id,customers_telephone,message,message2,message4) => {
  if (currentPass == "" || newPass == "" || confirmPass == "") {
    return {
      type: PROFILE_MSG,
      payload: {
        isChangePass: true,
        isError: true,
        isSuccess: false,
        msg: message
      }
    };
  } else if (newPass != confirmPass) {
    return {
      type: PROFILE_MSG,
      payload: {
        isChangePass: true,
        isError: true,
        isSuccess: false,
        msg: message2
      }
    };
  } 
  else if (strongRegex.test(newPass) === false&&newPass.length<6) {
    return{
      type: PROFILE_MSG,
      payload: {
        isChangePass: true,
        isError: true,
        isSuccess: false,
        msg: message4
      }
    };
  } 
  else {
    return dispatch => {
      dispatch({type: RESET_PROFILE_MSG});
      dispatch({
        type: START_PROFILE_LOADING,
        payload: {
          update_profile_Btn: false,
          reset_pass_btn: true
        }
      });
      client.post(`updatecustomerinfo`, {
        currentPassword:currentPass,
          password: newPass,
          customers_id: user_id,
          customers_telephone:customers_telephone
        })
        .then(response => {
          if(response.data.message!="current password does not match."){
          dispatch({
            type: PROFILE_MSG,
            payload: {
              isChangePass: true,
              isError: false,
              isSuccess: true,
              msg: response.data.message
            }
          });
        }
        else if(response.data.message=="current password does not match."){
          dispatch({
            type: PROFILE_MSG,
            payload: {
              isChangePass: true,
              isError: true,
              isSuccess: false,
              msg: response.data.message
            }
          });
        }
          dispatch({
            type: START_PROFILE_LOADING,
            payload: {
              update_profile_Btn: false,
              reset_pass_btn: false
            }
          });
          setTimeout(
            () => dispatch({type: SHOW_RESET_PASSWORD_MODAL, payload: false}),
            1000
          );
        })
        .catch(error => {
          dispatch({
            type: PROFILE_MSG,
            payload: {
              isChangePass: true,
              isError: true,
              isSuccess: false,
              msg: JSON.parse(error.request._response).message
            }
          });
          dispatch({
            type: START_PROFILE_LOADING,
            payload: {
              update_profile_Btn: false,
              reset_pass_btn: false
            }
          });
        });
    };
  }
};
//END CHANGING USER Password
