import {
    MOBILE_AUTHENTICATION_TEXTS,
    USER_MOBILE_AUTH_INFO,
    MOBILE_AUTHNTICATION_MESSAGE,
    MOBILE_AUTHNTICATION_LOADING,
    RESET_MOBILE_AUTHENTICATION_COMPLETELY
  } from './types';

  import { AsyncStorage } from 'react-native';

  
  //START GET MOBILE AUTH TEXT VALUE
  export const getMobileAuthTextsValue = ({prop,value})=>
  {
    return dispatch =>
    {
      dispatch({type:MOBILE_AUTHENTICATION_TEXTS,payload:{prop,value}})
    }
  }
  //END GET MOBILE AUTH TEXT VALUE
  
  //START SET USER MOBILE AUTH INFO
  export const setUserMobileAuthInfo = (info) =>
  {
    return dispatch =>
    {
      AsyncStorage.setItem("userMobileAuth",JSON.stringify(info));
    }
  
  }
  //END SET USER MOBILE AUTH INFO
  
  //START GET USER MOBILE AUTH INFO
  export const getUserMobileAuthInfo = () =>
  {
    return dispatch =>
    {
      AsyncStorage.getItem('userMobileAuth').then((res) => {
        if (res != null) {
          dispatch({type:USER_MOBILE_AUTH_INFO,payload:JSON.parse(res)});
        }
        },(error) => {
         dispatch({type:USER_MOBILE_AUTH_INFO,payload:null});
       });
  }
  };
  //END GET USER MOBILE AUTH INFO
  
  //START RESET MOBILE AUTH TO COMPLETELY
  export const resetMobileAuthToCompletely = () =>
  {
    return dispatch =>
    {
      dispatch({type:RESET_MOBILE_AUTHENTICATION_COMPLETELY});
    }
  
  }
  //END RESET MOBILE AUTH TO COMPLETELY
  