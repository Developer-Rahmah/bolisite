import {GET_PAYMENT_TEXT,SHOW_PAYMENT_ONLINE_MODAL,SHOW_PAYMENT_UPON_DELIVERY_MODAL,RESET_PAYMENT_COMPLETELY,GET_CITIES} from '../actions/types';
import { Platform } from 'expo-core';
  
  const INITIAL_STATE = {
     payment_online:false,
     payment_upon_delivery:false,
     show_payment_online_modal:false,
     show_payment_upon_delivery_modal:false,
     payment_info_name:'',
     payment_info_credit_Card:'',
     payment_info_cvv:'',
     payment_info_ExMonth:'',
     payment_info_ExYear:'',
     address:'',
     city:"Amman",
     email:"",
     area:"",
     address_name:"",
     Bulding_type:"",
     street_name:"",
     Bulding:"",
     floor:"",
     apartment_number:"",
     additional_description:"",
     phone_number:{
      code:1,
      number:''
      },
     details:'',
     cities:[],
     months :[
      // {id:1,month:'Expiry Month',value:''},
      {id:2,month:'January',value:'01'},
      {id:3,month:'February',value:'02'},
      {id:4,month:'March',value:'03'},
      {id:5,month:'April',value:'04'},
      {id:6,month:'May',value:'05'},
      {id:7,month:'June',value:'06'},
      {id:8,month:'July',value:'07'},
      {id:9,month:'August',value:'08'},
      {id:10,month:'September',value:'09'},
      {id:11,month:'October',value:'10'},
      {id:12,month:'November',value:'11'},
      {id:13,month:'December',value:'12'},
    ]
     }
  
  export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PAYMENT_TEXT:
        return {...state,[action.payload.prop]:action.payload.value}

        case SHOW_PAYMENT_ONLINE_MODAL:
        return {...state, show_payment_online_modal: action.payload};

        case GET_CITIES:
        return { ...state,cities:action.payload }

        case SHOW_PAYMENT_UPON_DELIVERY_MODAL:
        return {...state, show_payment_upon_delivery_modal: action.payload};

        case RESET_PAYMENT_COMPLETELY:
      return {...state,address:'',city:'',details:'',payment_online:false,payment_upon_delivery:false,payment_info_ExMonth:'',payment_info_ExYear:'',payment_info_credit_Card:'',payment_info_cvv:'',payment_info_name:''};
  
      default:
        return state;
  
    }
  }
  