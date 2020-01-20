import {
    GET_IMAGE_INFO,
  
    } from '../actions/types';
  
  const INITIAL_STATE = {
    information: [],
  }
  
  export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_IMAGE_INFO:
        return {
          ...state,
          information: action.payload
        }

     
  
      default:
        return state;
  
    }
  }
  