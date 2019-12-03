import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { annotationRequestSuccess } from './actions';
import api from '../../../services/api';

export function* loadAnnotation() {
  try {
    const response = yield call(api.get, '/api/v1/annotations');
    const annotation = response.data;
    yield put(annotationRequestSuccess(annotation));
  } catch (e) {
    Alert.alert(
      'Erro',
      'Ocorreu um erro ao obter as anotações, verifique sua conexão!'
    );
  }
}

export default all([
  takeLatest('@annotation/ANNOTATION_REQUEST', loadAnnotation),
]);
