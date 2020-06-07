import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // named exports

import authRuducer from './authReducer';
import streamReducer from './streamReducer';
import commentReducer from './commentReducer';

export default combineReducers({
    auth: authRuducer,
    /*
        formReducer: Function that tells how to update the Redux store based on changes
        coming from the application; those changes are described by Redux actions

        Can be a different name, but requires configuration
    */
    form: formReducer, 
    stream: streamReducer,
    comment: commentReducer
});