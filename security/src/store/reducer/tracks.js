import * as actionTypes from '../action/actionTypes';

const ERROR_CODE_MESSAGE = {
    401: 'Not Authorized',
    404: 'Resource Not Found',
    500: 'Internal Server Error'
}
const initialState = {
    tracks: null,
    errorMessage: null,
}

const tracks = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_TRACKS:
            return {
                ...state,
                tracks: [...action.tracks],
                isError: false
            }
        case actionTypes.FETCH_TRACKS_FAILED:
            return {
                ...state,
                errorMessage: ERROR_CODE_MESSAGE[action.code] ? ERROR_CODE_MESSAGE[action.code] : 'Error: Try Again Later',
            }
        default: return state;
    }
}

export default tracks;
