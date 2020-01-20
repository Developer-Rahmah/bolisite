import {
    GET_CANCER_CARE_PROGRAM_TEXTS,RESET_CANCER_CARE_PROGRAM_MESSAGE,CANCER_CARE_PROGRAM_MESSAGE,RESET_CANCER_CARE_COMPLETELY,
    START_LOADING,

  } from '../actions/types';
import { Platform } from 'expo-core';
  
  const INITIAL_STATE = {
   full_name:'',
  id_number:'',
   cancer_care_program_msg:null,
   cancer_care_program_loading:false,
   coverage:"",
   are_you_jordanian_yes:false,
   are_you_jordanian_no:false,
   passport_number:'',
   nationality:"",
   passport_image:'',
   id_image:''

   

  }
  
  export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
      case GET_CANCER_CARE_PROGRAM_TEXTS:
       return {...state,[action.payload.prop]:action.payload.value}
  
       case CANCER_CARE_PROGRAM_MESSAGE:
       return {...state,cancer_care_program_msg:action.payload}

     case RESET_CANCER_CARE_PROGRAM_MESSAGE:
      return {...state,cancer_care_program_msg:null}

     case START_LOADING:
      return { ...state,life_insurance_loading:action.payload }

      case RESET_CANCER_CARE_COMPLETELY:
      return {...state,full_name:'',id_number:'',coverage:'',are_you_jordanian_no:false,are_you_jordanian_yes:false,passport_number:'',nationality:""};
  
      default:
     return state;
    }
  };
  