import {
    GET_SHIPPING_INSURANCE_TEXTS,RESET_SHIPPING_INSURANCE_MESSAGE,SHIPPING_INSURANCE_MESSAGE,
    START_LOADING,GET_WHATS_TO_SHIPPING,GET_CARRIER,GET_COUNTRIES

  } from '../actions/types';
  
  const INITIAL_STATE = {
    name:'',
    what_your_shipping:'',
    shipped_date:'',
    shipped_from:'',
    shipped_to:'',
    carrier_name:'',
   shipping_insurance_msg:null,
   shipping_insurance_loading:false,
   whats_to_shipping_array:[],
   carrier:[],
   countries:[]

   

  }
  
  export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
      case GET_SHIPPING_INSURANCE_TEXTS:
       return {...state,[action.payload.prop]:action.payload.value}
  
       case SHIPPING_INSURANCE_MESSAGE:
       return {...state,shipping_insurance_msg:action.payload}

     case RESET_SHIPPING_INSURANCE_MESSAGE:
      return {...state,shipping_insurance_msg:null}

     case START_LOADING:
      return { ...state,shipping_insurance_loading:action.payload }


      case GET_WHATS_TO_SHIPPING:
      return { ...state,whats_to_shipping_array:action.payload }

      case GET_CARRIER:
      return { ...state,carrier:action.payload }

      case GET_COUNTRIES:
      return { ...state,countries:action.payload }




  
      default:
     return state;
    }
  };
  