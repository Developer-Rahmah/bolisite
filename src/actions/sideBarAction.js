import {GET_LANGUAGE_TEXT,RESET_LIFE_COMPLETELY,RESET_TRAVEL_COMPLETELY,RESET_HEALTH_COMPLETELY,RESET_SERVANT_COMPLETELY,RESET_CANCER_CARE_COMPLETELY,
  RESET_CAR_COMPLETELY
} from './types';

import {AsyncStorage} from 'react-native';


//START FETCHING LANGUAGES
export const getLanguageText = (language) => {
return (dispatch) => {
  AsyncStorage.setItem("locale", language);

  AsyncStorage.getItem("locale").then((value) => {
 
    dispatch({type: GET_LANGUAGE_TEXT, payload: value})
    });




}
};
//END FETCHING LANGUAGES
export const resetLifeCompletely = () => {
  return (dispatch) => {
    dispatch({type: RESET_LIFE_COMPLETELY})
  
  
  
  }
  };
  export const resetTravelCompletely = () => {
    return (dispatch) => {
      dispatch({type:   RESET_TRAVEL_COMPLETELY
      })

    }
    };
    
    export const resetHealthCompletely = () => {
      return (dispatch) => {
        dispatch({type:RESET_HEALTH_COMPLETELY
        })
  
      }
      };
      export const resetServantCompletely = () => {
        return (dispatch) => {
          dispatch({type:RESET_SERVANT_COMPLETELY
          })
    
        }
        };
        export const resetCancerCompletely = () => {
          return (dispatch) => {
            dispatch({type:RESET_CANCER_CARE_COMPLETELY
            })
      
          }
          };
          
          export const resetCarCompletely = () => {
            return (dispatch) => {
              dispatch({type:RESET_CAR_COMPLETELY
              })
        
            }
            };