import {
    GET_USER_TEXT,
    START_AUTH_LOADING,
    SIGININ_MSG,
    SIGINUP_MSG,
    RESET_MSG,
    SHOW_RECOVER_PASSWORD_MODAL,
    RECOVER_PASS_MSG,
    CET_RECOVER_PASSWORD_EMAIL_TEXT,
    IS_USER_LOGGEDIN,
    SHOW_MOBILE_CODE_MODAL,
    MOBILE_AUTHENTICATION_TEXTS,
    MOBILE_AUTHNTICATION_LOADING,
    MOBILE_AUTHNTICATION_MESSAGE,
    SHOW_MOBILE_CODE_MODAL_RECOVER_PASSWORD,
    MOBILE_AUTHENTICATION_TEXTS_RECOVER_PASSWORD,
    RECOVER_PASSWORD_MODAL,
    REVOCER_MSG,
    SHOW_RESEND_CODE_MODAL,
    RESET_LOGIN_DATA
    
  } from './types';
  import { Keyboard } from "react-native";
  import axios from 'axios';
  import { Actions } from 'react-native-router-flux';
  import { AsyncStorage } from 'react-native';
import client from '../constants';
import {currentLocale } from '../../Locales/i18n'

const validate_email=  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])");

  // const base_URL = 'https://bolisati.qiotic.info/app';
  //START GETTING INPUTS TEXT ACTION
export const getUserText = ({prop, value}) => {
    const obj = {type: GET_USER_TEXT,payload: {prop,value}};
    return obj;
  };
  //END GETTING INPUTS TEXT ACTION
//START GET MOBILE AUTH TEXT VALUE
export const getMobileAuthTextsValue = ({prop,value})=>
{
  return dispatch =>
  {
    dispatch({type:MOBILE_AUTHENTICATION_TEXTS,payload:{prop,value}})
  }
}
//END GET MOBILE AUTH TEXT VALUE

export const getMobileAuthTextsValueRecoverPassword = ({prop,value})=>
{
  return dispatch =>
  {
    dispatch({type:MOBILE_AUTHENTICATION_TEXTS_RECOVER_PASSWORD,payload:{prop,value}})
  }
}
  //START  LOGIN USER ACTION
export const loginUser = (phone_number, password,device_id,platform,message) => {


    return (dispatch) => {
      console.log("device_id",device_id)
      console.log("platform",platform)

      console.log("password",password)
      console.log("customers_telephone",phone_number.number)

      if (phone_number.number ==''||password == '') {
        dispatch({
          type: SIGININ_MSG,
          payload: {
            isError: true,
            isSuccess: false,
            msg:message
          }
        });
  
      } 
   
        else {
          Keyboard.dismiss();
          dispatch({
            type: START_AUTH_LOADING,
            payload: {
              signin_loading: true,
              signup_loading: false,
              recover_loading: false
            }
          });
          console.log("customers_telephone",phone_number.number)
          console.log("password",password)

          client.post(`processlogin`, {
            device_id:device_id,
            device_type:platform,
            customers_telephone	: phone_number.number,
            password: password
          }).then(function(response) {
            console.log("response12345",response)
            dispatch({
              type: START_AUTH_LOADING,
              payload: {
                signin_loading: false,
                signup_loading: false,
                recover_loading: false
              }
            });
       
            if (response.data.status=="200")
         {
          dispatch({
            type: IS_USER_LOGGEDIN,
            payload: {
              isLoggedIn: true,
              data: response.data.data
            }
          });
            AsyncStorage.setItem("user",JSON.stringify(response.data.data));
            console.log("hoooooooon")
            Actions.home();
            setTimeout(() => dispatch({type: RESET_LOGIN_DATA}), 1000);
         }
         else if (response.data.success!="400"&&response.data.message!="Your account is not activated."){
           console.log("here response.data.success",response.data.message)
          dispatch({
            type: SIGININ_MSG,
            payload: {
              isError: true,
              isSuccess: false,
              msg: response.data.message
            }
          });
          
         }
         else if (response.data.message=="Your account is not activated."){
           console.log("hhjdhjdhjdhdjdhdjdhddhddhj")
          dispatch({type: SHOW_MOBILE_CODE_MODAL, payload: true});
          // dispatch({type: SHOW_MOBILE_CODE_MODAL_RECOVER_PASSWORD, payload: true});

          dispatch({
            type: SIGININ_MSG,
            payload: {
              isError: true,
              isSuccess: false,
              msg: response.data.message
            }
          });

         }
          }).catch(function(error) {
            console.log("errorr",error)
            const res = JSON.parse(error.request._response);
            dispatch({
              type: SIGININ_MSG,
              payload: {
                isError: true,
                isSuccess: false,
                msg: "error in something"
              }
            });
            dispatch({
              type: START_AUTH_LOADING,
              payload: {
                signin_loading: false,
                signup_loading: false,
                recover_loading: false
              }
            });
          
          });
        }
      }
  
    // }
  };
  //END LOGIN USER ACTION

  //START CHECK USER IF LOGGED IN
export const isLoggIn = () => {
  return dispatch => {
    AsyncStorage.getItem("user").then(
      res => {
        dispatch({
          type: IS_USER_LOGGEDIN,
          payload:
            res != null
              ? {
                  isLoggedIn: true,
                  data: JSON.parse(res)
                }
              : {
                  isLoggedIn: false,
                  data: null
                }
        });
      },
      error => {
        dispatch({
          type: IS_USER_LOGGEDIN,
          payload: {
            isLoggedIn: false,
            data: null
          }
        });
      }
    );
  };
};
//END CHECK USER IF LOGGED IN

  //START RESETTING ERROR AND SUCCESS MESSAGES ACTION
export const resetAuthMessage = () => {
    return ({type: RESET_MSG})
  }
  //END RESETTING ERROR AND SUCCESS MESSAGES ACTION

  //START SHOW/HIDE MODAL
export const showRecoverPasswordModal = value => {
  return {type: SHOW_RECOVER_PASSWORD_MODAL, payload: value};
};
//END SHOW/HIDE MODAL
  //START SHOW/HIDE MODAL
  export const showResendCodeModal = value => {
    return {type: SHOW_RESEND_CODE_MODAL, payload: value};
  };
  //END SHOW/HIDE MODAL
  //START SHOW/HIDE MODAL
  export const recoverPasswordModal = value => {
    return {type: RECOVER_PASSWORD_MODAL, payload: value};
  };
  //END SHOW/HIDE MODAL

  //START SHOW/HIDE MODAL
export const showMobileCodeModal = value => {
  return {type: SHOW_MOBILE_CODE_MODAL, payload: value};
};
//END SHOW/HIDE MODAL
  
  //START SHOW/HIDE MODAL
  export const showMobileCodeModalRecoverPassword = value => {
    return {type: SHOW_MOBILE_CODE_MODAL_RECOVER_PASSWORD, payload: value};
  };
  //END SHOW/HIDE MODAL

export const recoverPassword = (phone_number) => {
  console.log("phone_number",phone_number)
  return (dispatch) => {
    dispatch({type: RESET_MSG});
    if (phone_number.number == '') {
      dispatch({
        type: RECOVER_PASS_MSG,
        payload: {
          isError: true,
          isSuccess: false,
          msg: "Number is required"
        }
      });

    }

    else {
      dispatch({
        type: START_AUTH_LOADING,
        payload: {
          signin_loading: false,
          signup_loading: false,
          recover_loading: true
        }
      });
      client.post(`processforgotpassword`,{
        customers_telephone:phone_number.number,
 
      }).then(function(response) {
        console.log("responsee",response)
        dispatch({
          type: START_AUTH_LOADING,
          payload: {
            signin_loading: false,
            signup_loading: false,
            recover_loading: false
          }
        });
        dispatch({type: SHOW_RECOVER_PASSWORD_MODAL, payload: false});
        dispatch({type: SHOW_MOBILE_CODE_MODAL_RECOVER_PASSWORD, payload: true});

        dispatch({
          type: RECOVER_PASS_MSG,
          payload: {
            isError: false,
            isSuccess: true,
            msg: response.data.message
          }
        });
      }).catch(function(error) {
        console.log("error",error)
        const res = JSON.parse(error.request._response);
        dispatch({
          type: START_AUTH_LOADING,
          payload: {
            signin_loading: false,
            signup_loading: false,
            recover_loading: false
          }
        });
        dispatch({type: RECOVER_PASS_MSG, payload: response.data.message});

      });
    }
  }
};
//END ACTION CREATOR FOR RECOVER PASSWORD INSIDE SIGN IN


//START SIGN UP USER ACTION
export const signupUser = (first_name, last_name, password,phone_number,confirm_password,email,message,message2,message3,message4) => {
  console.log("emailllll",email)
  console.log("first_name",first_name)
  console.log("last name",last_name)
  console.log("phone number",phone_number.number)
  console.log("password",password.length)
  return (dispatch) => {
    if (first_name == '' || last_name == '' || password == ''||phone_number.number==''||confirm_password=='') {
      dispatch({
        type: SIGINUP_MSG,
        payload: {
          isError: true,
          isSuccess: false,
          msg: message
        }
      });
   

    } 
    else if (validate_email.test(email) === false) {
      dispatch({
        type: SIGINUP_MSG,
        payload: {
          isError: true,
          isSuccess: false,
          msg: message3
        }
      });
    } 
    else if (strongRegex.test(password) === false&&password.length<6) {
        dispatch({
          type: SIGINUP_MSG,
          payload: {
            isError: true,
            isSuccess: false,
            msg: message4
          }
        });
      } 
    else {
    
        if (password != confirm_password) {
          
          dispatch({
            type: SIGINUP_MSG,
            payload: {
              isError: true,
              isSuccess: false,
              msg:message2
            }
          });
      } 

        else{
          Keyboard.dismiss();

        client.post(`processregistration`, {
          customers_firstname: first_name,
          customers_lastname: last_name,
          customers_telephone:phone_number.number,
          password: password,
          email:email
      

        }).then(function(response) {
          console.log("response",response)
          dispatch({
            type: START_AUTH_LOADING,
            payload: {
              signin_loading: false,
              signup_loading: false,
              recover_loading: false
            }
          });
          if(response.data.status!="400")
          {
       
        
          dispatch({type: SHOW_MOBILE_CODE_MODAL, payload: true});
        }
      
          else{
            dispatch({
              type: SIGINUP_MSG,
              payload: {
                isError: true,
                isSuccess: false,
                msg: response.data.message
              }
            });
          }

        }).catch(function(error) {
          console.log("error11111111",error)
          const res = JSON.parse(error.request._response);
          console.log("res",res)
          dispatch({
            type: SIGINUP_MSG,
            payload: {
              isError: true,
              isSuccess: false,
              msg: res.message
            }
          });
          dispatch({
            type: START_AUTH_LOADING,
            payload: {
              signin_loading: false,
              signup_loading: false,
              recover_loading: false
            }
          });

        });
      }
    }
  }
};
//END SIGN UP USER ACTION

//START SIGN OUT USER
export const signOut = () => {
  return dispatch => {
    AsyncStorage.removeItem("user");
    dispatch({
      type: IS_USER_LOGGEDIN,
      payload: {isLoggedIn: false, data: null}
    });

  };
};
//END SIGN OUT USER

export const mobileAuthentication= (phone_number, code) => {
console.log("phone number",phone_number.number)
console.log("code",code)

  return (dispatch) => {
   
        client.post(`verify-user`, {
          contact_number	: phone_number.number,
          code: code
        }).then(function(response) {
          console.log("response12345",response)
          dispatch({
            type: MOBILE_AUTHNTICATION_LOADING,
            payload: {
              mobile_auth_loading: false
            }
          });
          if (response.data.message !="not verified")
          {
            dispatch({type: SHOW_MOBILE_CODE_MODAL, payload: false});

Actions.login()

      
          }
         if(response.data.message =="not verified"){
          console.log("here response.data.success",response.data.message)
          dispatch({type: SHOW_MOBILE_CODE_MODAL, payload: false});

                   dispatch({type: SHOW_RESEND_CODE_MODAL, payload: true});

    
      }
        }).catch(function(error) {
          console.log("error",error)
          const res = JSON.parse(error.request._response);
          dispatch({
            type: MOBILE_AUTHNTICATION_MESSAGE,
            payload: {
              isError: true,
              isSuccess: false,
              msg: "error in something"
            }
          });
          dispatch({
            type: MOBILE_AUTHNTICATION_LOADING,
            payload: {
              mobile_auth_loading: false,

            }
          });
        
        });
      }
    // }

  // }
};
//END SIGNOUT USER

//START FORGET VERIFY
export const forgetverify= (phone_number, code) => {
  console.log("phone number",phone_number.number)
  console.log("code",code)
  
    return (dispatch) => {
   
          client.post(`forgetverify`, {
            customers_telephone	: phone_number.number,
            code: code
          }).then(function(response) {
            console.log("response12345",response)
            dispatch({
              type: MOBILE_AUTHNTICATION_LOADING,
              payload: {
                mobile_auth_loading: false
              }
            });
            dispatch({type: SHOW_MOBILE_CODE_MODAL_RECOVER_PASSWORD, payload: false});
            dispatch({type: RECOVER_PASSWORD_MODAL, payload: true});

      
           console.log("here response.data.success",response.data.message)
          dispatch({
            type: MOBILE_AUTHNTICATION_MESSAGE,
            payload: {
              isError: true,
              isSuccess: false,
              msg: response.data.message
            }
          });
         
          }).catch(function(error) {
            console.log("error",error)
            const res = JSON.parse(error.request._response);
            dispatch({
              type: MOBILE_AUTHNTICATION_MESSAGE,
              payload: {
                isError: true,
                isSuccess: false,
                msg: "error in something"
              }
            });
            dispatch({
              type: MOBILE_AUTHNTICATION_LOADING,
              payload: {
                mobile_auth_loading: false,
  
              }
            });
          
          });
        }
      // }
  
    // }
  };
  //END FORGET VERIFY
    //START CHANGING USER Password
export const recoverPasswordFunc = (pass, confirmPass,customers_telephone,message,message2,message4) => {
  console.log("ljskhskhkshkshkhsk")
  if (pass == "" || confirmPass == "") {
    return {
      type: REVOCER_MSG,
      payload: {
        isChangePass: true,
        isError: true,
        isSuccess: false,
        msg: message
      }
    };
  } else if (pass != confirmPass) {
    return {
      type: REVOCER_MSG,
      payload: {
        isChangePass: true,
        isError: true,
        isSuccess: false,
        msg: message2
      }
    };
    
  } 
  else if (strongRegex.test(pass) === false&&pass.length<6) {
    return{
      type: REVOCER_MSG,
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
      dispatch({
        type: START_AUTH_LOADING,
        payload: {
          update_profile_Btn: false,
          reset_pass_btn: true
        }
      });
      client.post(`changepassword`, {
        customers_telephone:customers_telephone,
        password:pass
        })
        .then(response => {
          console.log("response",response)
   
          dispatch({
            type: REVOCER_MSG,
            payload: {
              isChangePass: true,
              isError: false,
              isSuccess: true,
              msg: response.data.message
            }
          });
     
      
          dispatch({
            type: START_AUTH_LOADING,
            payload: {
              update_profile_Btn: false,
              reset_pass_btn: false
            }
          });
          setTimeout(
            () => dispatch({type: RECOVER_PASSWORD_MODAL, payload: false})
            ,
            1000
          );
        })
        .catch(error => {
          console.log("hereeeeeeeeeeeeee",error)
          dispatch({
            type: REVOCER_MSG,
            payload: {
              isChangePass: true,
              isError: true,
              isSuccess: false,
              msg: JSON.parse(error.request._response).message
            }
          });
          dispatch({
            type: START_AUTH_LOADING,
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
//START RESEND CODE
export const resendCode = (phone_number) => {
  console.log("phone_number,bumber",phone_number.number)
  return (dispatch) => {
    if (phone_number.number == '') {
      dispatch({
        type: RECOVER_PASS_MSG,
        payload: {
          isError: true,
          isSuccess: false,
          msg: "Number is required"
        }
      });

    }

    else {
  
      client.post(`sendcode`,{
        customers_telephone:phone_number.number
      }).then(function(response) {
        console.log("responsee od send code ",response)
        dispatch({
          type: START_AUTH_LOADING,
          payload: {
            signin_loading: false,
            signup_loading: false,
            recover_loading: false
          }
        });
        dispatch({type: SHOW_RESEND_CODE_MODAL, payload: false});
        dispatch({type: SHOW_MOBILE_CODE_MODAL, payload: true});


        dispatch({
          type: RECOVER_PASS_MSG,
          payload: {
            isError: false,
            isSuccess: true,
            msg: response.data.message
          }
        });
      }).catch(function(error) {
        console.log("error",error)
        const res = JSON.parse(error.request._response);
  
        dispatch({type: RECOVER_PASS_MSG, payload: response.data.message});

      });
    }
  }
};
//END RESEND CODE