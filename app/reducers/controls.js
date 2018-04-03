import {PLAY_SONG, PAUSE_SONG, NEXT_SONG, PREV_SONG} from '../actions/controls'
import { ENETRESET } from 'constants';


const controls = (state = {}, action)  => {
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

export default controls