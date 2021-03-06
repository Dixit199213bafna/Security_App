import * as actionTypes from './actionTypes';

export const setTracks = tracks => {
    return {
        type: actionTypes.SET_TRACKS,
        tracks
    }
}

export const fetchTracksFailed = (code) => {
    return {
        type: actionTypes.FETCH_TRACKS_FAILED,
        code
    }
}
export const fetchTracks = (date) => {
    return (dispatch) => {
        fetch(`/api/gtctracks?page=1&size=2000&updateSince=${date.toISOString()}Z&expand=detail`, {
            headers: {
                Authorization: 'Basic X2RlbW9fOl9kZW1vXzAw',
            }
        }).then(response => response.json())
        .then(data => {
            if(data.error) {
                return Promise.reject(data.error);
            }
            dispatch(setTracks(data.items));
        })
        .catch(error => {
            dispatch(fetchTracksFailed(error.code));
        });
    }
}
