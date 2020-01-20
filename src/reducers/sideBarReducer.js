import {AsyncStorage} from 'react-native'
import {
  GET_LANGUAGE_TEXT


  } from '../actions/types';

// const INITIAL_STATE = {
// lang:'ar'
// }
var INITIAL_STATE ={}
  AsyncStorage.getItem("locale").then((value) => {
INITIAL_STATE = {
  lang:value!=null?value:"ar"
  }         });

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LANGUAGE_TEXT:
    return {
      ...state,
      lang: action.payload
    }


    default:
      return state;

  }
}

