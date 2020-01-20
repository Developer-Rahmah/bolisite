import {
    GET_HELP_TEXT,
    START_LOADING,
    RESET_HELP_MESSAGE,
    HELP_MESSAGE,
    RESET_PAGE_COMPLETELY,
    GET_INFO
   } from '../actions/types';
  const INITIAL_STATE ={
    subject:'',
    email:'',
    loading:'',
    message:'',
    submittion_msg:null,
    info:[]
  };
  
  
  export default (state =INITIAL_STATE,action)=>
  {
    switch (action.type) {
      case GET_HELP_TEXT:
      return {...state,[action.payload.prop]:action.payload.value};
  
      case HELP_MESSAGE:
      return {...state,submittion_msg:action.payload};
  
      case START_LOADING:
      return {...state,loading:action.payload.loading};
  
      case RESET_HELP_MESSAGE:
      return {...state,submittion_msg:null};
  
      case RESET_PAGE_COMPLETELY:
      return INITIAL_STATE;

      case RESET_PAGE_COMPLETELY:
   return {...state,email:'',subject:'',message:''};
  
   case GET_INFO:
   return {
     ...state,
     info: action.payload
   }

      default:
      return state;
  
    }
  };
  