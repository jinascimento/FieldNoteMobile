import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import annotation from './annotation/sagas';

export default function* rootSaga() {
  return yield all([auth, annotation]);
}
