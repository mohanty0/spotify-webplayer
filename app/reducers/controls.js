import {PLAY_SONG, PAUSE_SONG, NEXT_SONG, PREV_SONG, GOT_DEVICES} from '../actions/actionTypes'
import {combineReducers} from 'redux'

const song_controls  = (state = {}, action)  => {
    switch (action.type) {
        case PLAY_SONG : 
            return {
                ...state, 
                isPlaying: true,
            }
        case PAUSE_SONG : 
            return {
                ...state, 
                isPlaying: false, 
            }
        case NEXT_SONG : 
            return {
                ...state
            }
        case PREV_SONG : 
            return {
                ...state  
            }
        default : 
            return state 
    }
}

const device_controls = (state = [], action) => {
    switch (action.type) {
        case GOT_DEVICES : 
            return {
              devices: action.devices
            }
        default : 
            return state 
    }
}

const controls = combineReducers({
    song: song_controls, 
    device: device_controls, 
})
export default controls; 