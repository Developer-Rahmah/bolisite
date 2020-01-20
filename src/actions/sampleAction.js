import  {SAMPLE_ACTION,RECIVE_API_DATA, REQUEST_API_DATA } from './types'


export function updateUser( payLoad ) {
    return ({
        type: SAMPLE_ACTION,
        payload: {
            payLoad : payLoad
        }
    })   
}

export const  reciveApiData = (data) => {
    return {
        type : RECIVE_API_DATA,
        payload: {
            todoList : data
        }
    }   
}

export const  requestApiData = () => {
    return {
        type : REQUEST_API_DATA,
    }   
}