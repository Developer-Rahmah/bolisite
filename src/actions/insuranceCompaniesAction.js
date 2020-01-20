import {SHOW_INSURANCE_COMPANY_MODAL,GET_ADDONS,GET_TERMS,GET_COMPANIES_TEXT,LIFE_INSURANCE_MESSAGE,SHOW_PDF_MODAL,SHOW_INSURANCE_COMPANY_MODAL_CAR,SHOW_SORT_MODAL,SHOW_SORT_MODAL_CAR,GET_INSURANCE_COMPANIES_TRAVEL,INSURANCE_LOADING, INSURANCE_LOADING_CAR, GET_INSURANCE_COMPANIES_CAR} from './types';
import client from '../constants';
import { Actions } from 'react-native-router-flux';

  //START SHOW/HIDE MODAL
  export const showInsuranceCompanyModal = value => {
    return {type: SHOW_INSURANCE_COMPANY_MODAL, payload: value};
  };
  export const showSortingModal= value => {
    return {type: SHOW_SORT_MODAL, payload: value};
  };
// END SHOW/HIDE MODAL
export const showSortingModalCar= value => {
  return {type: SHOW_SORT_MODAL_CAR, payload: value};
};
//START SHOW/HIDE MODAL
  export const showInsuranceCompanyModal2 = value => {
    return {type: SHOW_INSURANCE_COMPANY_MODAL_CAR, payload: value};
  };
  //END SHOW/HIDE MODAL

    //START SHOW/HIDE MODAL
    export const showPdfModal = value => {
      return {type: SHOW_PDF_MODAL, payload: value};
    };
    //END SHOW/HIDE MODAL
    export const getInsuranceCompanies = ( data,user_id,category_id) => {
      return (dispatch) => {
     
        
        dispatch({type: INSURANCE_LOADING, payload: true})

            client.post(`travelinsurance`,{
              'age':data.age,
              'region':data.to,
              'days':data.days_to_stay,
              'price':data.price
            }).then(function(response) {
        console.log("response55",response)
        dispatch({type: GET_INSURANCE_COMPANIES_TRAVEL, payload: response.data.data})
        dispatch({type: INSURANCE_LOADING, payload: false})

  
            })
            .catch(function(error) {
              console.log("error11111111",error)
              dispatch({type: INSURANCE_LOADING, payload: false})

              // dispatch({
              //   type: TRAVEL_INSURANCE_MESSAGE,
              //   payload: {
              //     isError: true,
              //     isSuccess: false,
              //     msg: res.message
              //   }
              // });
        
    
            });
          }
        
      
    };
    export const getInsuranceCompaniesCars = ( data) => {
      return (dispatch) => {
     
        
        dispatch({type: INSURANCE_LOADING_CAR, payload: true})

        client.post(`orderinsurance`, {
          car_type: data.car_type,
          car_model:data.car_model,
          manufacturing_year:data.manufacturing_year,
          insurance_type:data.insurance_type,
          car_salary:data.car_salary,
          start_date:data.start_date,
          end_date:data.end_date,
          fuel_type:data.fuel_type,
          // accendient_question:accendient_question

        }).then(function(response) {
        console.log("response55carsss",response)
        dispatch({type: GET_INSURANCE_COMPANIES_CAR, payload: response.data.data})
        dispatch({type: INSURANCE_LOADING_CAR, payload: false})

  
            })
            .catch(function(error) {
              console.log("error11111111",error)
              dispatch({type: INSURANCE_LOADING_CAR, payload: false})

              // dispatch({
              //   type: TRAVEL_INSURANCE_MESSAGE,
              //   payload: {
              //     isError: true,
              //     isSuccess: false,
              //     msg: res.message
              //   }
              // });
        
    
            });
          }
        
      
    };
    export const FilterResults = ( data,price,user_id,category_id) => {
      return (dispatch) => {
     
        
        dispatch({type: INSURANCE_LOADING, payload: true})
        dispatch({type: SHOW_SORT_MODAL, payload: false});

            client.post(`travelinsurance`,{
              'age':data.age,
              'region':data.to,
              'days':data.days_to_stay,
              'price':price
            }).then(function(response) {
        console.log("response55",response)
        dispatch({type: SHOW_SORT_MODAL, payload: false});
        dispatch({type: GET_INSURANCE_COMPANIES_TRAVEL, payload: response.data.data})
        dispatch({type: INSURANCE_LOADING, payload: false})
  //             Actions.insurancecompanies({
  //             insuranceCompanies:response.data.data,
  //             travelInformation:data,
  //             user_id:user_id,
  //             category_id:category_id,
  // insurance_type:"Travel Insurance"
  //             });
  
            })
            .catch(function(error) {
              console.log("error11111111",error)
              const res = JSON.parse(error.request._response);
              dispatch({type: INSURANCE_LOADING, payload: false})

              // dispatch({
              //   type: TRAVEL_INSURANCE_MESSAGE,
              //   payload: {
              //     isError: true,
              //     isSuccess: false,
              //     msg: res.message
              //   }
              // });
        
    
            });
          }
        
      
    };
    export const FilterResultsCar = ( data,price,user_id,category_id,insurance_type,accendient_question,full_name) => {
      console.log("priceeee",price)
      return (dispatch) => {
     
        
      
        //     client.post(`travelinsurance`,{
        //       'age':data.age,
        //       'region':data.to,
        //       'days':data.days_to_stay,
        //       'price':data.price
        //     }).then(function(response) {
        // console.log("response55",response)
        // dispatch({type: SHOW_SORT_MODAL, payload: false});

        //       Actions.insurancecompanies({
        //       insuranceCompanies:response.data.data,
        
        //       });
  
        //     })
        //     .catch(function(error) {
        //       console.log("error11111111",error)
        //       const res = JSON.parse(error.request._response);
        //       // dispatch({
        //       //   type: TRAVEL_INSURANCE_MESSAGE,
        //       //   payload: {
        //       //     isError: true,
        //       //     isSuccess: false,
        //       //     msg: res.message
        //       //   }
        //       // });
        
    
        //     });
        dispatch({type: INSURANCE_LOADING_CAR, payload: true})
        dispatch({type: SHOW_SORT_MODAL_CAR, payload: false});

        client.post(`orderinsurance`, {
          car_type: data.car_type,
          car_model:data.car_model,
          manufacturing_year:data.manufacturing_year,
          insurance_type:data.insurance_type,
          car_salary:data.car_salary,
          start_date:data.start_date,
          end_date:data.end_date,
          fuel_type:data.fuel_type,
          price:price
          // accendient_question:accendient_question

        }).then(function(response) {
        console.log("response77",response)

        dispatch({type: SHOW_SORT_MODAL_CAR, payload: false});
        dispatch({type: GET_INSURANCE_COMPANIES_CAR, payload: response.data.data})
        dispatch({type: INSURANCE_LOADING_CAR, payload: false})
            // Actions.insurancecompanies2({
            //   insuranceCompanies:response.data.data,
            //   carInformation:data,
            //   user_id:user_id ,
            //   category_id:category_id ,
            //   insurance_type:"Car Insurance",
            //   accendient_question:accendient_question,

            //   full_name:full_name          
            //   });
                     
            })
            .catch(function(error) {
              console.log("error11111111",error)
              const res = JSON.parse(error.request._response);
              dispatch({type: INSURANCE_LOADING_CAR, payload: false})

              // dispatch({
              //   type: TRAVEL_INSURANCE_MESSAGE,
              //   payload: {
              //     isError: true,
              //     isSuccess: false,
              //     msg: res.message
              //   }
              // });
        
    
            });
          }
      
    };
//START FETCHING ADDONS
export const getAddons = (manufacturers_id,category_id) => {


return (dispatch) => {
  client.post(`companyaddons`,{
    'manufacturers_id':manufacturers_id,
    'categories_id':category_id
  }).then((response) => {
    const res = response.data.data;
    dispatch({type: GET_ADDONS, payload: res})

  }).catch((error) => {
      console.log("error")
    dispatch({type: GET_ADDONS, payload: []})

  })
}
};
//END FETCHING ADDONS

//START FETCHING TERMS
export const getTerms = (manufacturers_id) => {
  return (dispatch) => {
    client.post(`companyinformation?manufacturers_id=${manufacturers_id}`).then((response) => {
      const res = response.data.data;
      dispatch({type: GET_TERMS, payload: res})
  
    }).catch((error) => {
        console.log("error")
      dispatch({type: GET_TERMS, payload: []})
  
    })
  }
  };
  //END FETCHING TERMS

//START GET INSURANCE COMPANIES TEXT
export const getInsuranceCompaniesText = ({prop, value}) => {
  return dispatch => {
    dispatch({type: GET_COMPANIES_TEXT, payload: {prop, value}});
  }
};
//END GET INSURANCE COMPANIES TEXT
//START LIFE INSURANCE ORDER
export const lifeInsuranceOrder=(insuranceCompaanyId,lifeInsuranceInformation,user_id)=>{

  return (dispatch) => {
    client.post(`addlifeorder`,{
      'national_id' :lifeInsuranceInformation.id_number,
      'name' :lifeInsuranceInformation.full_name,
      'age' :lifeInsuranceInformation.age,
      'company_id' :insuranceCompaanyId,
      'user_id':user_id,
      'value_of_insurance':lifeInsuranceInformation.value_of_insurance,
      'beneficiaries':lifeInsuranceInformation.beneficiaries
    }).then(function(response) {
      Actions.DoneScreen({user_id:user_id})

      dispatch({
        type: LIFE_INSURANCE_MESSAGE,
        payload: {
          isError: false,
          isSuccess: true,
          msg: "success"
        }
      });
 
    })
  }
}
//END LIFE INSURANCE ORDER
//START TRAVEL INSURANCE ORDER 
export const travelInsuranceOrder=(insuranceCompaanyId,travelInformation,user_id)=>{
  return (dispatch) => {
    client.post(`addtravelorder`,{
      'passport_number' :travelInformation.passport_number,
      'name' :travelInformation.full_name,
      'travel_date' :travelInformation.travel_date,
      'travel_from' :travelInformation.from,
      'travel_to' :travelInformation.to,
      'days_to_stay':travelInformation.days_to_stay,
      'company_id' :insuranceCompaanyId,
      'user_id':user_id
    }).then(function(response) {

      Actions.DoneScreen({user_id:user_id})


      dispatch({
        type: LIFE_INSURANCE_MESSAGE,
        payload: {
          isError: false,
          isSuccess: true,
          msg: "success"
        }
      });
 
    })
  }
}
//END TRAVEL INSURANCE ORDER 
//START CANCER CARE ORDER 
export const cancerCareProgramOrder=(insuranceCompaanyId,cancerCarProgramInformation,user_id)=>{
  return (dispatch) => {
    client.post(`addcancerorder`,{
      'name' :cancerCarProgramInformation.full_name,
      'national_id' :cancerCarProgramInformation.id_number,
      'company_id' :insuranceCompaanyId,
      'user_id':user_id
    }).then(function(response) {

      Actions.DoneScreen({user_id:user_id})


      dispatch({
        type: LIFE_INSURANCE_MESSAGE,
        payload: {
          isError: false,
          isSuccess: true,
          msg: "success"
        }
      });
 
    })
  }
}
//END CANCER CARE ORDER
//START SHIPPING INSURANCE ORDER
export const shippingInsuranceOrder=(insuranceCompaanyId,shippingInformation,user_id)=>{
  return (dispatch) => {
    client.post(`addcargoorder`,{
      'name' :shippingInformation.full_name,
      'what_your_shipping' :shippingInformation.what_your_shipping,
      'shipped_date' :shippingInformation.shipped_date,
      'shipped_from' :shippingInformation.shipped_from,
      'shipped_to' :shippingInformation.shipped_to,
      'carrier_name' :shippingInformation.carrier_name,
      'company_id' :insuranceCompaanyId,
      'user_id':user_id
    }).then(function(response) {
      Actions.DoneScreen({user_id:user_id})


      dispatch({
        type: LIFE_INSURANCE_MESSAGE,
        payload: {
          isError: false,
          isSuccess: true,
          msg: "success"
        }
      });
 
    })
  }
}
//END SHIPPING INSURANCE ORDER