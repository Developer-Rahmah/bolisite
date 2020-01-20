import {SHOW_INSURANCE_COMPANY_MODAL,GET_ADDONS,GET_TERMS,SHOW_PDF_MODAL,SHOW_INSURANCE_COMPANY_MODAL_CAR,SHOW_SORT_MODAL,SHOW_SORT_MODAL_CAR,GET_INSURANCE_COMPANIES_TRAVEL,INSURANCE_LOADING,INSURANCE_LOADING_CAR,GET_INSURANCE_COMPANIES_CAR} from '../actions/types';
  
  const INITIAL_STATE = {
      show_insurance_modal:false,
      addons:[],
      terms:[],
      show_pdf_modal:false,
      show_insurance_modal2:false,
      show_sort_modal:false,
      show_sort_modal_car:false,
      insurancecompaniesTravel:[],
      insurance_loading:false,
      insurance_loading_car:false,
      insurancecompaniesCar:false
     }
  
  export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_INSURANCE_COMPANY_MODAL:
        return {...state, show_insurance_modal: action.payload};
        case SHOW_SORT_MODAL:
          return {...state, show_sort_modal: action.payload};
          case SHOW_SORT_MODAL_CAR:
            return {...state, show_sort_modal_car: action.payload};
        case SHOW_INSURANCE_COMPANY_MODAL_CAR:
        return {...state, show_insurance_modal2: action.payload};
        case SHOW_PDF_MODAL:
        return {...state, show_pdf_modal: action.payload};

        case GET_ADDONS:
        return {...state,addons: action.payload
        }
        case GET_INSURANCE_COMPANIES_TRAVEL:
          return {...state,insurancecompaniesTravel: action.payload
          }
          case GET_INSURANCE_COMPANIES_CAR:
            return {...state,insurancecompaniesCar: action.payload
            }
        case GET_TERMS:
        return {...state,terms: action.payload
        }
        case INSURANCE_LOADING:
          return { ...state,insurance_loading:action.payload }
          case INSURANCE_LOADING_CAR:
            return { ...state,insurance_loading_car:action.payload }
      default:
        return state;
  
    }
  }
  