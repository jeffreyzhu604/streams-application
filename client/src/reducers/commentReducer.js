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
        case FETCH_COMMENT:
        case FETCH_COMMENTS:
        case EDIT_COMMENT:
        case DELETE_COMMENT:
        default:
            return state;
    }
};