import {
    GET_PRIVACY,
    GET_USER_AGREEMENT
 } from './types';
import client from '../constants';

//  const base_URL = 'https://bolisati.qiotic.info/app';

//START FETCHING privacy
export const getPrivacy = (lang) => {

  return (dispatch) => {
    // dispatch({type: HOME_LOADING, payload: true})
    client.post(`getallpages`,{
        'language_id':lang,
        'page_id':5
    }).then((response) => {
      const res = response.data.pages_data;
      dispatch({type: GET_PRIVACY, payload: res})
    //   dispatch({type: HOME_LOADING, payload: false})

    }).catch((error) => {
        console.log("error")
      dispatch({type: GET_PRIVACY, payload: []})
    //   dispatch({type: HOME_LOADING, payload: false})

    })
  }
};
//END FETCHING privacy
//START GET USER AGREEMENT
export const getUserAgreement = (lang) => {
    return (dispatch) => {
    //   dispatch({type: HOME_LOADING, payload: true})
    client.post(`getallpages`,{
        'language_id':lang,
        'page_id':6
    }).then((response) => {
        const res = response.data.pages_data;
        dispatch({type: GET_USER_AGREEMENT, payload: res})
        // dispatch({type: HOME_LOADING, payload: false})
  
      }).catch((error) => {
          console.log("error")
        dispatch({type: GET_USER_AGREEMENT, payload: []})
        // dispatch({type: HOME_LOADING, payload: false})
  
      })
    }
  };

//END GET USER AGREEMENT