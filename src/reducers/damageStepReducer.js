import {
    GET_DAMAGE_STEP_TEXTS,
  } from '../actions/types';
  
  const INITIAL_STATE = {
   damage_step_msg:null,
 

  }
  
  export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
      case GET_DAMAGE_STEP_TEXTS:
       return {...state,[action.payload.prop]:action.payload.value}
  

  
      default:
     return state;
    }
  };
  