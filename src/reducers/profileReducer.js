import {
    GET_PROFILE_TEXT,
    GET_PROFILE_INFO,
    UPDATE_PROFILE_INFO,
    PROFILE_MSG,
    RESET_PROFILE_MSG,
    START_PROFILE_LOADING,
    SHOW_RESET_PASSWORD_MODAL
    } from '../actions/types';
    
    
    const INITIAL_STATE = {
      profileInfo:  {},
      user_id:0,
      first_name:'',
      last_name:'',
      email:'',
      phone_number:{
        code:1,
        number:''
        },
        currentPassword:'',
        newPassword:'',
        confirmPassword:'',
        modalShow:false,
      profile_msg:null,
      start_loading_of:{
        update_profile_Btn:false,
        reset_pass_btn:false
      }
    };
    
    export default(state = INITIAL_STATE, action) => {
      switch (action.type) {
        case GET_PROFILE_TEXT:
          return {...state,[action.payload.prop]:action.payload.value};
    
          case PROFILE_MSG:
            return {...state,profile_msg:action.payload};
            case GET_PROFILE_INFO:
            return {
              ...state,
              profileInfo: action.payload
            }
    
        case START_PROFILE_LOADING:
              return {...state,start_loading_of:action.payload};
    
          case GET_PROFILE_INFO:
            return {
              ...state,
              profileInfo: action.payload
            }
    
        case RESET_PROFILE_MSG:
         return {...state,profile_msg:null};
    
         case SHOW_RESET_PASSWORD_MODAL:
               return {...state, modalShow: action.payload};
        default:
          return state;
    
      }
    }
    