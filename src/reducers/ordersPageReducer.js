import {
GET_ORDERS,
ORDERS_LOADING,SHOW_CANCEL_ORDER_MODAL,GET_REASONS,GET_ORDERS_TEXTS,RESET_VALUES

  } from '../actions/types';
  
  const INITIAL_STATE = {
   orders:[],
   orders_loading:false,
   show_order_modal:false,
   reasons:[],
   reason:'',
   reason_message:'',
   order_category:"",
   order_days:"last_one_month",
   montharray:[],
   threemontharray:[],
   moreThreearray:[]


   

  }
  export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
      case GET_ORDERS_TEXTS:
       return {...state,[action.payload.prop]:action.payload.value}
        case GET_ORDERS:
      return { ...state,orders:action.payload }
  
      case SHOW_CANCEL_ORDER_MODAL:
      return {...state, show_order_modal: action.payload};

      case ORDERS_LOADING:
      return {...state,orders_loading:action.payload };

      case GET_REASONS:
      return { ...state,reasons:action.payload }

      case RESET_VALUES:
      return {...state,order_category:"",order_days:"last_one_month"}
  
      default:
     return state;
    }
  };
  