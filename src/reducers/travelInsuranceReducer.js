import {
    GET_TRAVEL_INSURANCE_TEXTS,RESET_TRAVEL_INSURANCE_MESSAGE,TRAVEL_INSURANCE_MESSAGE,RESET_TRAVEL_COMPLETELY,
    START_LOADING,

  } from '../actions/types';

  const INITIAL_STATE = {
   full_name:'',
  passport_number:'',
  days_to_stay:"",
  age:"",
destination:'',
travel_date:'',
from:108,
to:"",
country:'',
   travel_insurance_msg:null,
   life_insurance_loading:false,
   phone_number:{
    code:1,
    number:''
    },
    email:''

   

  }
  
  export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
      case GET_TRAVEL_INSURANCE_TEXTS:
       return {...state,[action.payload.prop]:action.payload.value}
  
       case TRAVEL_INSURANCE_MESSAGE:
       return {...state,travel_insurance_msg:action.payload}

     case RESET_TRAVEL_INSURANCE_MESSAGE:
      return {...state,travel_insurance_msg:null}

     case START_LOADING:
      return { ...state,life_insurance_loading:action.payload }

      case RESET_TRAVEL_COMPLETELY:
      return {...state,full_name:'',passport_number:'',days_to_stay:'',age:'',destination:'',travel_date:'',from:108,to:'', phone_number:{
        code:1,
        number:''
        },email:''};
  
      default:
     return state;
    }
  };
  