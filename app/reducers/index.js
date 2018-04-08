import {combineReducers } from 'redux'
import controls from './controls'
import auth from './auth'
import music from './music'

export default combineReducers({
    auth, 
    controls,
    music, 
})