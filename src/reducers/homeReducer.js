import {
    GET_CATEGORIES,
    HOME_LOADING,
    GET_SHOW_ICON_TEXT,
    GET_CUSTOMER_INFO,
    GET_OCR_KEYS
  
    } from '../actions/types';
  
  const INITIAL_STATE = {
    categories: [],
    home_loading:false,
    show_icon:true,
    ocrKeys:[]
  }
  
  export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_CATEGORIES:
        return {
          ...state,
          categories: action.payload
        }
        case GET_OCR_KEYS:
          return {
            ...state,
            ocrKeys: action.payload
          }

        case HOME_LOADING:
        return {...state,home_loading:action.payload };
     
        case GET_SHOW_ICON_TEXT:
        return {
          ...state,
          show_icon: action.payload
        }
        case GET_CUSTOMER_INFO:
        return {
          ...state,
          customerInfo: action.payload
        }
      default:
        return state;
  
    }
  }
  