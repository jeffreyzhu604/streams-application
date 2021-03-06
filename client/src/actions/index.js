import { 
    SIGN_IN, 
    SIGN_OUT, 
    GET_PROFILE,
    REMOVE_PROFILE,
    GET_DB_PROFILE,
    SET_DB_PROFILE,
    REMOVE_DB_PROFILE,
    CREATE_STREAM, 
    FETCH_STREAMS, 
    FETCH_STREAM, 
    EDIT_STREAM, 
    DELETE_STREAM,
    CLEAR_CURRENT_STREAM,
    CREATE_COMMENT,
    FETCH_COMMENT,
    FETCH_COMMENTS,
    EDIT_COMMENT,
    DELETE_COMMENT,
    REPLY_COMMENT
} from './types';
import streams from '../api/streams';
import history from '../History';

// User authentication action creators
export const signIn = () => {
    return {
        type: SIGN_IN,
    };
};

export const signOut = () => {
    history.push('/');
    return {
        type: SIGN_OUT
    };
};

// TO DO: Remove all personal information except username
export const getProfile = (profile) => (dispatch) => {
    dispatch({ type: GET_PROFILE, payload: profile });
}

export const removeProfile = () => (dispatch) => {
    dispatch({ type: REMOVE_PROFILE });
}

export const getDbProfile = (profile) => async(dispatch) => {
    const data = profile;
    const response = await streams.get('http://localhost:8000/api/get/userprofilefromdb', {
        params: {
            email: data.profile.email
        }
    })
    dispatch({ type: GET_DB_PROFILE, payload: response.data });
    history.push('/');
}

export const setDbProfile = (profile) => async(dispatch) => {
    const response = await streams.post('http://localhost:8000/api/post/userprofiletodb', profile);
    dispatch({ type: SET_DB_PROFILE, payload: response.data });
    history.push('/');
}

export const removeDbProfile = () => async(dispatch) => {
    dispatch({ type: REMOVE_DB_PROFILE});
}

// Streams action creators
export const createStreams = (formValues) => async (dispatch, getState) => {
    const { dbUserProfile } = getState().auth;
    const response = await streams.post('http://localhost:8000/api/post/streams', {
        title: formValues.title,
        stream_description: formValues.description,
        uid: dbUserProfile[0].uid,
        username: dbUserProfile[0].username
    });
    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push('/');
};

export const fetchStreams = () => async (dispatch) => {
    const response = await streams.get('http://localhost:8000/api/get/streams');
    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
    const response = await streams.post(`http://localhost:8000/api/get/streams/${id}`, {
        sid: id
    });
    dispatch({ type: FETCH_STREAM, payload: response.data });
};

// Use getState instead of passing in streamId
export const editStream = (streamId, formValues) => async (dispatch) => {
    const response = await streams.put(`http://localhost:8000/api/put/streams/${streamId}`, {
        title: formValues.title,
        stream_description: formValues.stream_description,
        sid: streamId
    });
    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
};

export const deleteStream = (id) => async (dispatch) => {
    await streams.delete(`http://localhost:8000/api/delete/streams/${id}`, {
        sid: id
    });
    dispatch({ type: DELETE_STREAM, payload: id });
    history.push('/');
};

export const clearCurrentStream = () => (dispatch) => {
    dispatch({ type: CLEAR_CURRENT_STREAM });
}

// Comments action creator
export const initiateReply = () => {
    return {
        type: REPLY_COMMENT
    };
}

export const createComment = (currentStream, formValues, currentComment=null) => async(dispatch, getState) => {
    console.log(currentComment);
    const { dbUserProfile } = getState().auth;
    let values = {};
    if (dbUserProfile) {
        values.comment = formValues.comment;
        values.username = dbUserProfile[0].username;
        values.uid = dbUserProfile[0].uid;
        values.sid = currentStream[0].sid;
    } else {
        values.comment = formValues.comment;        
        values.sid = currentStream[0].sid;
    }
    if (currentComment)
        values.cid_reference = currentComment[0].cid;    
    const response = await streams.post(`http://localhost:8000/api/post/comment`, values);
    dispatch({ type: CREATE_COMMENT, payload: response.data});
    history.replace(`/streams/${currentStream[0].cid}`);
};

export const fetchComment = (cid, sid) => async(dispatch) => {
    const response = await streams.post(`http://localhost:8000/api/get/comment/${cid}`, {
        cid: cid
    });
    dispatch({ type: FETCH_COMMENT, payload: response.data });
    history.push(`/streams/${sid}`);
};

// Sort by highest upvotes and order by date (descending)
export const fetchComments = (currentStream) => async(dispatch, getState) => {
    if (!currentStream)
        return;
    console.log(currentStream[0].sid);
    // Updated to post request since it required a body
    const response = await streams.post('http://localhost:8000/api/get/comments', {
        sid: currentStream[0].sid
    });
    dispatch({ type: FETCH_COMMENTS, payload: response.data });
    history.push(`/streams/${currentStream[0].sid}`);
};

export const editComment = (formValues) => async(dispatch, getState) => {
    const { dbUserProfile } = getState().auth;
    const { currentStream } = getState().stream;
    const { currentComment } = getState().comment;
    const response = await streams.put(`http://localhost:8000/api/put/comments/${currentComment[0].cid}`, {
        cid: currentComment[0].cid,
        comment: formValues.comment,
        username: dbUserProfile[0].username,
        uid: dbUserProfile[0].uid,
        sid: currentStream[0].sid
    });
    dispatch({ type: EDIT_COMMENT, payload: response.data });
    history.push(`/streams/${currentStream[0].sid}`);
};

export const deleteComment = (id) => async(dispatch, getState) => {
    const { dbUserProfile } = getState().auth;
    const { currentStream } = getState().stream;
    const response = await streams.delete(`http://localhost:8000/api/delete/comments/${id}`, {
        cid: id,
        uid: dbUserProfile[0].uid
    });
    dispatch({ type: DELETE_COMMENT, payload: response.data });
    history.push(`/streams/${currentStream[0].sic}`);
}


export const deleteComments = (sid) => async(dispatch, getState) => {
    const { currentStream } = getState().stream;
    const response = await streams.delete(`http://localhost:8000/api/delete/stream/${sid}/comments`, {
        sid: sid
    });
    dispatch({ type: DELETE_COMMENT, payload: response.data });
    history.push(`/streams/${currentStream[0].si}`);
}