import {combineReducers} from 'redux'
import {GOT_CURR_PLAYBACK} from '../actions/actionTypes'

const song = (state = {}, action) => {
    switch (action.type) {
        case GOT_CURR_PLAYBACK : 
            return action.playback.item || state 
        default : 
            return state 
    }
}

const playlist = (state = {}, action) => {
    switch (action.type) {
        default : 
            return state 
    }
}

const music = combineReducers({
    song,
    playlist,
})

export default music 