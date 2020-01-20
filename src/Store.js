import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import {smapleRequest} from './Saga/sampleSaga'

const sagaMidllewar =createSagaMiddleware()
const initialState = {};


const store = createStore(rootReducer, initialState, applyMiddleware(...sagaMidllewar));

sagaMidllewar.run(smapleRequest);
export default store;
