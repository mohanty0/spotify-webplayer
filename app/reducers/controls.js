import {PLAY_SONG, PAUSE_SONG, NEXT_SONG, PREV_SONG, GOT_DEVICES, ACTIVE_DEVICE, GOT_CURR_PLAYBACK, NO_CURR_PLAYBACK} from '../actions/actionTypes'
import {combineReducers} from 'redux'

const song  = (state = {}, action)  => {
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
                ...state,
            }
        case PREV_SONG : 
            return {
                ...state,  
            }
        case ACTIVE_DEVICE : 
            return {
                ...state, 
                volume: action.device.volumePercent, 
                playingOn: action.device.id,
            }
        case NO_CURR_PLAYBACK : 
            return {
                ...state, 
                isPlaying: false,
            }
        case GOT_CURR_PLAYBACK : 
            return {
                ...state, 
                isPlaying: state.isPlaying || action.playback.isPlaying, 
                volume: action.playback.device.volumePercent,
                playingOn: action.playback.device.id, 
                shuffleState: action.playback.shuffleState, 
                repeatState: action.playback.repeatState, 
                progressMs: action.playback.progressMs,
            }
        default : 
            return state 
    }
}

const devices = (state = {}, action) => {
    switch (action.type) {
        case GOT_DEVICES : 
            return {
                ...state,
                devices: action.devices,  
            }
        default : 
            return state 
    }
}

const controls = combineReducers({
    song, 
    devices, 
})
export default controls; 