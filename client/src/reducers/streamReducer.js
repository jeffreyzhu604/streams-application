import {
    CREATE_STREAM, 
    FETCH_STREAMS, 
    FETCH_STREAM, 
    EDIT_STREAM, 
    DELETE_STREAM,
    CLEAR_CURRENT_STREAM
} from '../actions/types';

const INITIAL_STATE = {
    dbStreams: {},
    currentStream: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_STREAM:
            return {...state, currentStream: action.payload};
        case FETCH_STREAMS:
            return {...state, dbStreams: action.payload}; // Map the value of property id to be the key of new object
        case CREATE_STREAM:
            return {...state, dbStreams: action.payload};
        case EDIT_STREAM:
            return {...state, dbStreams: action.payload};
        case DELETE_STREAM:
            return {...state, dbStreams: action.payload}; // new object
        case CLEAR_CURRENT_STREAM:
            return {...state, currentStream: null};
        default: 
            return state;
    }
};