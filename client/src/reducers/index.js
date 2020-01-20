import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // named exports

import authRuducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
    auth: authRuducer,
    form: formReducer,
    stream: streamReducer
});