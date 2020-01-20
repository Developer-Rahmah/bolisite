import {
    GET_HEALTH_INSURANCE_TEXTS,RESET_HEALTH_INSURANCE_MESSAGE,HEALTH_INSURANCE_MESSAGE,RESET_HEALTH_COMPLETELY,
    START_LOADING,

  } from '../actions/types';
  
  const INITIAL_STATE = {
   full_name:'',
  id_number:'',
  age:'',
  health_insurance_msg:null,
  Do_you_have_any_diseases_yes:false,
  Do_you_have_any_diseases_no:false,



   

  }
  
  export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
      case GET_HEALTH_INSURANCE_TEXTS:
       return {...state,[action.payload.prop]:action.payload.value}
  
       case HEALTH_INSURANCE_MESSAGE:
       return {...state,health_insurance_msg:action.payload}

     case RESET_HEALTH_INSURANCE_MESSAGE:
      return {...state,health_insurance_msg:null}

     case START_LOADING:
      return { ...state,life_insurance_loading:action.payload }

      case RESET_HEALTH_COMPLETELY:
      return {...state,full_name:'',id_number:'',age:'',Do_you_have_any_diseases:'',Do_you_have_any_diseases_yes:false,Do_you_have_any_diseases_no:false};
  
      default:
     return state;
    }
  };
  