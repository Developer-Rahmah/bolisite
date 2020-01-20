import {GET_CAR_INFORMATION_TEXTS,RESET_CAR_INFORMATION_MESSAGE,GET_CARS,GET_CARS_MODAL,CAR_INFORMATIOB_MESSAGE,GET_COMPANIES} from './types';
import client from '../constants';
import { AsyncStorage } from 'react-native';
import {Actions} from "react-native-router-flux";

//  const base_URL = 'https://bolisati.qiotic.info/app';

//START GETTING INPUTS TEXT ACTION
export const getCarInformationTexts = ({prop, value}) => {
    return dispatch => {
      dispatch({type: GET_CAR_INFORMATION_TEXTS, payload: {prop, value}});
    }
  };
  //END GETTING INPUTS TEXT ACTION

  //START SHOW/HIDE MODAL
export const resetCarInformationMessage = value => {
    return {type:RESET_CAR_INFORMATION_MESSAGE};
  };

  
  //END SHOW/HIDE MODAL

  //START FETCHING CARS
export const getCars = (language_id) => {
return (dispatch) => {
  client.post(`getcartype`,{
    language_id:language_id
  }).then((response) => {
    const res = response.data.data;
    dispatch({type: GET_CARS, payload: res})
  }).catch((error) => {
      console.log("error",error)
    dispatch({type: GET_CARS, payload: []})
  })
}
};
//END FETCHING CARS
  //START GET COMPANIES
  export const getCompanies = () => {
    return (dispatch) => {
      client.post(`insurancecompany`).then((response) => {
        const res = response.data.data;
        dispatch({type: GET_COMPANIES, payload: res})
      }).catch((error) => {
          console.log("error")
        dispatch({type: GET_COMPANIES, payload: []})
      })
    }
    };
    //END GET COMPANIES


  //START GET MODAL
  export const getCarsModal = (car_id) => {
    return (dispatch) => {
      client.post(`getcarmodel?car_id=${car_id}`).then((response) => {
    
        const res = response.data.data;
        dispatch({type: GET_CARS_MODAL, payload: res})
      }).catch((error) => {
          console.log("error")
        dispatch({type: GET_CARS_MODAL, payload: []})
      })
    }
    };
    //END GET MODAL

    export const goToInsuranceCompanies = (full_name, id_number, insurance_type,car_type,vehicle_number,car_model,manufacturing_year,driver,fuel_type,car_salary,start_date,end_date,user_id,category_id, bolisa_number,car_category,company,drivingLiceneseImage,drivingLiceneseImageBack,message,accredient_question_no,accredient_question_yes,beneficiary1,insured) => {

var accendient_question
if(accredient_question_no==true){
    accendient_question=0
}
else if(accredient_question_yes==true){
    accendient_question=1
}

      return (dispatch) => {
        if (full_name == '' || id_number == '' || insurance_type == ''||insurance_type==undefined||car_type==''||car_type==undefined||car_model==undefined||vehicle_number==''||car_model==''||manufacturing_year==''||manufacturing_year==undefined||driver==''||driver==undefined||fuel_type==''||fuel_type==undefined||car_category==""||car_category==undefined||car_salary==''||start_date==''||end_date==''||drivingLiceneseImage==null||drivingLiceneseImageBack==null||(accredient_question_no==false&&accredient_question_yes==false)) {

          dispatch({
            type: CAR_INFORMATIOB_MESSAGE,
            payload: {
              isError: true,
              isSuccess: false,
              msg: message
            }
          });
       
    
        }  
        
            else{
           const data={ full_name: full_name,
            id_number: id_number,
            insurance_type:insurance_type,
            car_type: car_type,
            vehicle_number:vehicle_number,
            car_model:car_model,
            manufacturing_year:manufacturing_year,
            driver:driver,
            fuel_type:fuel_type,
            car_salary:car_salary,
            start_date:start_date,
            end_date:end_date,
            car_category:car_category,
            bolisa_number:bolisa_number,
            company:company,
            drivingLiceneseImage:drivingLiceneseImage,
            drivingLiceneseImageBack:drivingLiceneseImageBack,
            answer:accendient_question,
            beneficiary:beneficiary1,
            beneficiary_name:insured
      }
            client.post(`orderinsurance`, {
              car_type: car_type,
              car_model:car_model,
              manufacturing_year:manufacturing_year,
              insurance_type:insurance_type,
              car_salary:car_salary,
              start_date:start_date,
              end_date:end_date,
              fuel_type:fuel_type
              // accendient_question:accendient_question
    
            }).then(function(response) {
            
              if(Actions.currentScene=="carinformation2"){

              Actions.insurancecompanies2({
              insuranceCompanies:response.data.data,
              carInformation:data,
              user_id:user_id ,
              category_id:category_id ,
              insurance_type:"Car Insurance",
              accendient_question:accendient_question,

              full_name:full_name          
              });
            }
              AsyncStorage.setItem("car_information",JSON.stringify(data));

            }).catch(function(error) {
              console.log("error11111111",error)
              const res = JSON.parse(error.request._response);
              dispatch({
                type: CAR_INFORMATIOB_MESSAGE,
                payload: {
                  isError: true,
                  isSuccess: false,
                  msg: res.message
                }
              });
     
    
            });
          }
        }
      
    };
    //END Go  ACTION
   