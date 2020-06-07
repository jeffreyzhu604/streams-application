import { 
    SIGN_IN,
    SIGN_OUT,
    GET_PROFILE,
    REMOVE_PROFILE,
    SET_DB_PROFILE,
    GET_DB_PROFILE,
    REMOVE_DB_PROFILE
} from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    userProfile: null,
    dbUserProfile: null
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            // If property already exists, then it gets updated
            return {...state, isSignedIn: true};
        case SIGN_OUT:
            return {...state, isSignedIn: false};
        case GET_PROFILE:
            return {...state, userProfile: action.payload}
        case REMOVE_PROFILE:
            return {...state, userProfile: null}
        case SET_DB_PROFILE:
            return {...state, dbUserProfile: action.payload}
        case GET_DB_PROFILE:
            return {...state, dbUserProfile: action.payload}
        case REMOVE_DB_PROFILE:
            return {...state, dbUserProfile: null}
        default:
            return state;
    }
};