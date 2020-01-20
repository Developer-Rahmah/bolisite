import {
    GET_CATEGORIES,
    HOME_LOADING,
    GET_SHOW_ICON_TEXT,
    GET_CUSTOMER_INFO,
    IS_USER_LOGGEDIN,
    GET_OCR_KEYS
 } from './types';
import client from '../constants';

//  const base_URL = 'https://bolisati.qiotic.info/app';
//START GET CUSTOMER INFO
export const getCustomerInfo = (user_id) => {
  return (dispatch) => {
    client.post(`customerinfo?id=${user_id}`).then((response) => {
      const res = response.data.data;
      dispatch({type: GET_CUSTOMER_INFO, payload: res})

    })
    .catch((error) => {
        console.log("error")
      dispatch({type: GET_CUSTOMER_INFO, payload: []})

    })
  }
};
export const getOcrKeys = () => {
  return (dispatch) => {
    client.post(`ocrapi`).then((response) => {
      console.log("response if ocr keys",response)
      const res = response.data.data;
      dispatch({type: GET_OCR_KEYS, payload: res})

    })
    .catch((error) => {
        console.log("error")
      dispatch({type: GET_OCR_KEYS, payload: []})

    })
  }
};
//END GET CUSTOMER INFO
//START FETCHING CATEGORIES
export const getCategories = (lang) => {

  return (dispatch) => {
    dispatch({type: HOME_LOADING, payload: true})
    client.post(`allcategories?language_id=${lang}`).then((response) => {
      const res = response.data.data;
      dispatch({type: GET_CATEGORIES, payload: res})
      dispatch({type: HOME_LOADING, payload: false})

    }).catch((error) => {
        console.log("error")
      dispatch({type: GET_CATEGORIES, payload: []})
      dispatch({type: HOME_LOADING, payload: false})

    })
  }
};
//END FETCHING CATEGORIES


  export const getShowIconText = (show) => {
    return (dispatch) => {
  
      dispatch({type: GET_SHOW_ICON_TEXT, payload: show})

    }
    };