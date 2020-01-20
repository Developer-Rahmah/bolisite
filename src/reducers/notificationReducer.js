import {
    GET_NOTIFICATIONS,
    NOTIFICATIONS_LOADING,SHOW_CANCEL_ORDER_MODAL,GET_REASONS
    
      } from '../actions/types';
      
      const INITIAL_STATE = {
       notifications:[],
       notifications_loading:false,
       show_order_modal:false,
       reasons:[],
       reason:''
    
    
       
    
      }
      
      export default (state = INITIAL_STATE, action) =>{
        switch (action.type) {
    
            case GET_NOTIFICATIONS:
          return { ...state,notifications:action.payload }
     
          case SHOW_CANCEL_ORDER_MODAL:
          return {...state, show_order_modal: action.payload};
    
          case NOTIFICATIONS_LOADING:
          return {...state,notifications_loading:action.payload };
    
          case GET_REASONS:
          return { ...state,reasons:action.payload }
      
          default:
         return state;
        }
      };
      