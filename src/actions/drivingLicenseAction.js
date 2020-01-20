import axios from 'axios';
import {
    GET_IMAGE_INFO,
 } from './types';
import client from '../constants';


//START FETCHING imageOCR
export const getImageInfo = (uri) => {
  return (dispatch) => {
    axios.post(`https://api.ocr.space/parse/image`,{
        data:{ apikey:'103f8deacb88957',
      base64Image:uri,
      language:"ara",
      isOverlayRequired:true},
      headers: {'Content-Type': 'multipart/form-data' }

    })

   
    .then((response) => {
  console.log("response for image",response)
      const res = response.data.data;
      dispatch({type: GET_IMAGE_INFO, payload: res})

    }).catch((error) => {
        console.log("error",error)
      dispatch({type: GET_IMAGE_INFO, payload: []})

    })
  }
};
//END FETCHING imageOCR