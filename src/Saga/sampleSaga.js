import { takeLatest, put, call } from 'redux-saga/effects';
import { REQUEST_API_DATA , reciveApiData} from '../actions/sampleAction';
import {fetchData} from '../api/sampleApi'

function* getApiData(){
    const data = yield call(fetchData)
    yield put(reciveApiData(data))

}

export function* smapleRequest() {
    yield takeLatest(REQUEST_API_DATA, getApiData)
}