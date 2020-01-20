import {
    GET_LIFE_INSURANCE_TEXTS,RESET_LIFE_INSURANCE_MESSAGE,LIFE_INSURANCE_MESSAGE,MOTHER_SHOW_MODAL,FATHER_SHOW_MODAL,
    START_LOADING,DAUGHTERS_SHOW_MODAL,SISTER_SHOW_MODAL,BROTHER_SHOW_MODAL,WIFE_SHOW_MODAL,HUSBAND_SHOW_MODAL,RESET_LIFE_COMPLETELY

  } from '../actions/types';
import { Platform } from 'expo-core';
  
  const INITIAL_STATE = {
   full_name:'',
  id_number:'',
  full_name1:'',
  id_number1:'',
age:'',
father:false,
mother:false,
sister:false,
brother:false,
daughters:false,
husband:false,
wife:false,
value_of_insurance:"",
   life_insurance_msg:null,
   life_insurance_loading:false,
   modalFatherShow:false,
   modalMotherShow:false,
   modalBrotherShow:false,
   modalSisterShow:false,
   modalDaughtersShow:false,
   modalHusbandShow:false,
   modalWifeShow:false,
   father_name:'',
   father_id:'',
   father_percentage:'',
   mother_name:'',
   mother_id:'',
   mother_percentage:'',
   sister_name:'',
   sister_id:'',
   sister_percentage:'',
   brother_name:'',
   brother_id:'',
  brother_percentage:'',
  daughters_name:'',
  daughters_id:'',
  daughters_percentage:'',
  husband_name:'',
  husband_id:'',
  husband_percentage:'',
  wife_name:'',
  wife_id:'',
  wife_percentage:'',
  fatherInfo:null,
  motherInfo:null,
  sisterInfo:null,
  brotherInfo:null,
  daughtersInfo:null,
  husbandInfo:null,
  wifeInfo:null,
   
   

  }
  
  export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
    
      case GET_LIFE_INSURANCE_TEXTS:
       return {...state,[action.payload.prop]:action.payload.value}
  
       case LIFE_INSURANCE_MESSAGE:
       return {...state,life_insurance_msg:action.payload}

     case RESET_LIFE_INSURANCE_MESSAGE:
      return {...state,life_insurance_msg:null}

     case START_LOADING:
      return { ...state,life_insurance_loading:action.payload }
      case MOTHER_SHOW_MODAL:
      return {...state, modalMotherShow: action.payload};
      case FATHER_SHOW_MODAL:
      return {...state, modalFatherShow: action.payload};
      case BROTHER_SHOW_MODAL:
      return {...state, modalBrotherShow: action.payload};
      case SISTER_SHOW_MODAL:
      return {...state, modalSisterShow: action.payload};
      case DAUGHTERS_SHOW_MODAL:
      return {...state, modalDaughtersShow: action.payload};
      case HUSBAND_SHOW_MODAL:
      return {...state, modalHusbandShow: action.payload};
      case WIFE_SHOW_MODAL:
      return {...state, modalWifeShow: action.payload};
      case RESET_LIFE_COMPLETELY:
      return {...state,full_name:'',id_number:'',age:'',value_of_insurance:'',father_name:'',father_id:'',father_percentage:'',mother_name:'',mother_id:'',mother_percentage:'',brother_name:'',
    brother_id:'',brother_percentage:'',sister_name:'',sister_id:'',sister_percentage:'',daughters_name:'',daughters_id:'',daughters_percentage:'',wife_name:'',wife_id:'',wife_percentage:'',husband_name:'',husband_id:'',husband_percentage:'',
  father:false,mother:false,brother:false,sister:false,wife:false,husband:false,daughters:false,full_name1:'',id_number1:''};
default:
 return state;

  
  
    }
  };
  