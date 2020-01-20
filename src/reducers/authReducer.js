import {SIGININ_MSG,
      SIGINUP_MSG,
      GET_USER_TEXT,
      START_AUTH_LOADING,
      SHOW_RECOVER_PASSWORD_MODAL,
      RECOVER_PASS_MSG,
      CET_RECOVER_PASSWORD_EMAIL_TEXT,
      IS_USER_LOGGEDIN,
      SHOW_MOBILE_CODE_MODAL,
      SHOW_MOBILE_CODE_MODAL_RECOVER_PASSWORD,
      RESET_MSG,
      MOBILE_AUTHENTICATION_TEXTS,
      MOBILE_AUTHNTICATION_LOADING,
      MOBILE_AUTHNTICATION_MESSAGE,
      MOBILE_AUTHENTICATION_TEXTS_RECOVER_PASSWORD,
      RECOVER_PASSWORD_MODAL,
      REVOCER_MSG,
      SHOW_RESEND_CODE_MODAL,
      RESET_LOGIN_DATA
      


      
}from '../actions/types';
import { Platform } from 'expo-core';

  const initialState ={
    password:'',
    confirm_password:'',
    email:'',
    recover_password:'',
    confirm_recover_password:'',
    first_name:'',
    last_name:'',
    phone_number:{
        code:1,
        number:''
        },
        user: {
            isLoggedIn: false,
            data: null
          },
    country:Platform.OS="android"?"1":'1',
    signin_alert_message:null,
    signup_alert_message: null,
    show_modal:false,
    show_mobile_modal:false,
    show_modal_recover:false,
    show_mobile_modal_recover_password:false,
    recover_email:'',
    recover_password_msg:null,
    recover_password_email:'',
    recover_msg:'',
    firstInput:'',
    secondInput:'',
    thirdInput:'',
    fourthInput:'',
    codeInput: '',
    show_resend_code:false,
    firstInputRecover:'',
    secondInputRecover:'',
    thirdInputRecover:'',
    customerInfo:[],
    fourthInputRecover:'',
    start_loading_of:{
        signin_loading:false,
        signup_loading:false,
        recover_loading:false
      }  };

  export default (state = initialState, action) => {
    switch (action.type) {
        case SIGININ_MSG:
        return {...state,signin_alert_message:action.payload,recover_email:''};

        case GET_USER_TEXT:
        return {...state,[action.payload.prop]:action.payload.value};

        case START_AUTH_LOADING:
        return {...state,start_loading_of:action.payload};

        case SHOW_RECOVER_PASSWORD_MODAL:
        return {...state, show_modal: action.payload};

        case SHOW_RESEND_CODE_MODAL:
        return {...state, show_resend_code: action.payload};

        case RECOVER_PASSWORD_MODAL:
        return {...state, show_modal_recover: action.payload};
        case SHOW_MOBILE_CODE_MODAL:
        return {...state, show_mobile_modal: action.payload};

        case SHOW_MOBILE_CODE_MODAL_RECOVER_PASSWORD:
        return {...state, show_mobile_modal_recover_password: action.payload};
        
        case IS_USER_LOGGEDIN:
        return {...state, user: action.payload};

        case RECOVER_PASS_MSG:
        return {...state,recover_password_msg:action.payload}


        case REVOCER_MSG:
        return {...state,recover_msg:action.payload}

        case CET_RECOVER_PASSWORD_EMAIL_TEXT:
        return {...state,[action.payload.prop]:action.payload.value};

        case SIGINUP_MSG:
        return {
          ...state,
          signup_alert_message: action.payload,
          recover_email: ""
        };
        case RESET_MSG:
        return {
          ...state,
          signin_alert_message: null,
          signup_alert_message: null,
          recover_password_msg: ""
        };
        case MOBILE_AUTHENTICATION_TEXTS:
        return {...state, [action.payload.prop]:action.payload.value};
        case MOBILE_AUTHENTICATION_TEXTS_RECOVER_PASSWORD:
        return {...state, [action.payload.prop]:action.payload.value};

        case MOBILE_AUTHNTICATION_LOADING:
        return {...state, mobile_auth_loading:action.payload };
      
        case MOBILE_AUTHNTICATION_MESSAGE:
        return {...state, mobile_auth_message:action.payload };

        case RESET_LOGIN_DATA:
        return {...state,   phone_number:{
          code:1,
          number:''
          },password:''};
        default:
            return state;
    }
}
