import {
    GET_SERVANT_INSURANCE_TEXTS,RESET_SERVANT_INSURANCE_MESSAGE,SERVANT_INSURANCE_MESSAGE,RESET_SERVANT_COMPLETELY,
    START_LOADING,

  } from '../actions/types';
import { Platform } from 'expo-core';
  
  const INITIAL_STATE = {
nationality:"",
servant_insurance_msg:'',
full_name:'',
  passport_number:'',
  phone_number:{
    code:1,
    number:''
    },
    email:''
   

  }
  
  export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
      case GET_SERVANT_INSURANCE_TEXTS:
       return {...state,[action.payload.prop]:action.payload.value}
  
       case SERVANT_INSURANCE_MESSAGE:
       return {...state,servant_insurance_msg:action.payload}

     case RESET_SERVANT_INSURANCE_MESSAGE:
      return {...state,servant_insurance_msg:null}

     case START_LOADING:
      return { ...state,life_insurance_loading:action.payload }

      case RESET_SERVANT_COMPLETELY:
      return {...state,nationality:'',full_name:'',passport_number:'',email:'', phone_number:{
        code:1,
        number:''
        }};


  
      default:
     return state;
    }
  };
  