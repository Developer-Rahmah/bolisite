import {
    GET_PRIVACY, GET_USER_AGREEMENT,

  
    } from '../actions/types';
  
  const INITIAL_STATE = {
    privacy: [],
    userAgreement:[]
  }
  
  export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_PRIVACY:
        return {
          ...state,
          privacy: action.payload
        }
        case GET_USER_AGREEMENT:
        return {
          ...state,
          userAgreement: action.payload
        }

  
    
      default:
        return state;
  
    }
  }
  