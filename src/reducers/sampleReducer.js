import {SAMPLE_REDUCE} from './../actions/types';

const initialState = {
  sampleState: {}
};


export default (state = initialState, action) => {
    switch (action.type) {
        case SAMPLE_REDUCE:
            return {
                ...state,
                sampleState: action.payload.sampleResponse
            };
        default:
            return state;
    }
}