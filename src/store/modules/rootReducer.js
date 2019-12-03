import { combineReducers } from 'redux';

import auth from './auth/reducer';
import annotation from './annotation/reducer';

export default combineReducers({
  auth,
  annotation,
});
