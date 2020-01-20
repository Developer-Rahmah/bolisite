import {
    MOBILE_AUTHENTICATION_TEXTS,
    USER_MOBILE_AUTH_INFO,
    MOBILE_AUTHNTICATION_MESSAGE,
    MOBILE_AUTHNTICATION_LOADING,
    RESET_MOBILE_AUTHENTICATION_COMPLETELY
  } from '../actions/types';
 
 const INITIAL_STATE = {
   user: null,
   mobile_auth_message:null,
   codeInput: '',
   phone:{
     code:1,
     nubmer:''
     },
     mobile_auth_loading:false,
     confirmResult:null,
     firstInput:'',
     secondInput:'',
     thirdInput:'',
     fourthInput:'',
     fifthInput:'',
     sixthInput:''
 }
 
 export default (state = INITIAL_STATE, action)=>
 {
 switch (action.type) {
   case MOBILE_AUTHENTICATION_TEXTS:
   return {...state, [action.payload.prop]:action.payload.value};
 
   case USER_MOBILE_AUTH_INFO:
   return {...state, user:action.payload };
 
   case MOBILE_AUTHNTICATION_LOADING:
   return {...state, mobile_auth_loading:action.payload };
 
   case MOBILE_AUTHNTICATION_MESSAGE:
   return {...state, mobile_auth_message:action.payload };
 
   case RESET_MOBILE_AUTHENTICATION_COMPLETELY:
   return INITIAL_STATE;
 
   default:
   return state;
 
 }
 
 }