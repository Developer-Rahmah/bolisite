import {
    GET_CAR_INFORMATION_TEXTS,
    CAR_INFORMATIOB_MESSAGE,
    RESET_CAR_INFORMATION_MESSAGE,
    START_LOADING,
    GET_CARS,
    GET_CARS_MODAL,
    GET_COMPANIES,RESET_CAR_COMPLETELY
  } from '../actions/types';
  import {Platform }from 'react-native'
  const INITIAL_STATE = {
   full_name:'',
  id_number:'',
   insurance_type:"",
   car_type:'',
   vehicle_number:'',
   coding:'',
   car_model:'',
   car_category:"",
   bolisa_number:'',
   manufacturing_year:'',
   driver:"",
   fuel_type:"",
   car_salary:'',
   start_date:'',
   end_date:'',
   car_information_msg:null,
   information_loading:false,
   cars:[],
   cars_model:[],
   insuranceCompanies:[],
   company:"",
   accredient_question_yes:false,
   accredient_question_no:false,
   beneficiary:'',
   other:false,
   himself:true,
   insured:''

   

  }
  
  export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
      case GET_CAR_INFORMATION_TEXTS:
       return {...state,[action.payload.prop]:action.payload.value}
  
       case CAR_INFORMATIOB_MESSAGE:
       return {...state,car_information_msg:action.payload}

     case RESET_CAR_INFORMATION_MESSAGE:
      return {...state,car_information_msg:null}

     case START_LOADING:
      return { ...state,information_loading:action.payload }

      case GET_CARS:
      return { ...state,cars:action.payload }

      case GET_COMPANIES:
      return { ...state,insuranceCompanies:action.payload }

      case GET_CARS_MODAL:
      return { ...state,cars_model:action.payload }

      case RESET_CAR_COMPLETELY:
      return {...state,full_name:'',id_number:'',insurance_type:'',car_type:'',vehicle_number:'',coding:'',bolisa_number:'',car_model:'', manufacturing_year:'',driver:'',
      fuel_type:'',car_salary:'',start_date:'',end_date:'',company:'',beneficiary:'',
      accredient_question_yes:false,
      accredient_question_no:false};

  
      default:
     return state;
    }
  };
  