import {LOGGED_IN, NOT_LOGGED_ID, GOT_USER_INFO} from '../actions/actionTypes'

const auth = (state = {}, action) => {
    switch(action.type) {
        case LOGGED_IN:
            return {
                ...state,
                accessToken: action.accessToken, 
                refreshToken: action.refreshToken, 
                loggedIn: true, 
            }
        case NOT_LOGGED_ID: 
            return {
                ...state, 
                loggedIn: false,
            }
        case GOT_USER_INFO: 
            return {
                ...state, 
                userId : action.userId,
            }
        default: 
            return state
    }
}

export default auth 