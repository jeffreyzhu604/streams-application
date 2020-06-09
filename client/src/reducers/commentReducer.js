import {
    CREATE_COMMENT,
    FETCH_COMMENT,
    FETCH_COMMENTS,
    EDIT_COMMENT,
    DELETE_COMMENT
} from '../actions/types';

const INITIAL_STATE = {
    dbComments: {},
    currentComment: null
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CREATE_COMMENT:
            return {...state, dbComments: action.payload};
        case FETCH_COMMENT:
            return {...state, currentComment: action.payload};
        case FETCH_COMMENTS:
            return {...state, dbComments: action.payload};
        case EDIT_COMMENT:
            return {...state, dbComments: action.payload};
        case DELETE_COMMENT:
            return {...state, dbComments: action.payload};
        default:
            return state;
    }
};